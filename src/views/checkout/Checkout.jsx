import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/nav/logo.webp";
import Footer from "../../components/Footer/Footer";
import Shippinginfo from "./component/Shippinginfo";
import Bilingdetails from "./component/Bilingdetails";
import PaymentDetails from "./component/PaymentDetails";
import { useAuth } from "../../hooks/useAuth";
import { selectCurrentUser } from "../../features/auth/authSlice";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { useGetUserCartQuery } from "../../features/cart/cartApiSlice";
import { numberWithCommas } from "../../utils";

const TabComponent = React.memo(({ tabs, activeTab, setActiveTab, data, handleChange }) => {
  return (
    <>
      {tabs.map((tab) => {
        const Component = tab.component;
        return (
          <div
            className="border shadow-sm bg-white py-4 md:py-6 rounded-xl"
            key={tab.id}
          >
            <div className="px-4 md:px-6">
              <div className="flex flex-row items-center justify-between">
                <h6 className="text-regal-blue text-sm md:text-[16px] mb-4 font-[700]">
                  {tab.id}.{tab.name}
                </h6>
                {tab.id !== activeTab && (
                  <button
                    className="text-regal-sky-blue text-xs md:text-sm mb-4 font-[700] active:scale-95"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    Show more
                  </button>
                )}
              </div>
              <h6 className="text-regal-light-gray text-xs md:text-sm">
                {tab.details}
              </h6>
            </div>
            {tab.id === activeTab && (
              <Component data={data} handleChange={handleChange} setActiveTab={setActiveTab} />
            )}
          </div>
        );
      })}
    </>
  );
});

const OrderSummary = React.memo(({ cartDetails, data }) => {
  const total = useMemo(() => {
    return cartDetails?.products?.reduce(
      (acc, item) => acc + item?.price * item?.quantity,
      0
    );
  }, [cartDetails]);

  const estTotal = useMemo(() => total + data?.shippingPay, [total, data]);

  return (
    <div className="border shadow-sm bg-white py-4 rounded-xl">
      {cartDetails?.loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <h5 className="text-sm text-regal-blue font-[700] px-4">Order Summary</h5>
          <div className="flex flex-row justify-between items-start m-4">
            <div>
              <h6 className="text-sm font-[500] text-regal-black">Subtotal</h6>
              <p className="text-xs font-[500] text-regal-light-gray">
                {cartDetails?.products?.length} items
              </p>
            </div>
            <p className="text-sm font-[600] text-regal-black">
              ₦{numberWithCommas(total)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-start m-4">
            <div>
              <h6 className="text-sm font-[500] text-regal-black">Estimated Shipping</h6>
              <p className="text-xs font-[500] text-regal-light-gray">
                {cartDetails?.products?.length} items
              </p>
            </div>
            <p className="text-sm font-[600] text-regal-black">
              ₦{numberWithCommas(data?.shippingPay)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-start py-4 border-t">
            <div className="px-4">
              <h6 className="text-sm font-[500] text-regal-black">Est.Total</h6>
            </div>
            <p className="text-lg font-[600] text-regal-black px-4">
              ₦{numberWithCommas(estTotal)}
            </p>
          </div>
          <div className="px-4 py-2 w-full">
            <button
             className="text-sm bg-regal-sky-blue text-white px-4 py-2 font-semibold w-full rounded-md hover:bg-blue-600">
              Pay now
            </button>
          </div>
        </>
      )}
    </div>
  );
});

function Checkout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const { isLoading, isAuthenticated } = useAuth();
  const userData = useSelector(selectCurrentUser);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    street: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    cardHolderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    companyName: "",
    shippingPay: 0,
  });

  const {
    data: cartDetails,
    isLoading: loading,
    refetch,
  } = useGetUserCartQuery();

  useEffect(() => {
    if (userData) {
      setData((prevData) => ({
        ...prevData,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phoneNumber: userData?.phoneNumber,
        email: userData?.email,
      }));
    }
  }, [userData]);

  const handleChange = useCallback((e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const validateForm = useCallback((formData) => {
    const requiredFields = [
      "firstName", "lastName", "phoneNumber", "email",
      "street", "country", "city", "state", "zipCode",
      "cardHolderName", "cardNumber", "expiry", "cvv", 
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`The ${field} field is required and cannot be empty.`);
        return false;
      }
    }
    return true;
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateForm(data)) {
      localStorage.setItem("checkoutDetails", JSON.stringify(data));
      navigate("/payment");
    }
  }, [data, validateForm, navigate]);

  const tabs = useMemo(() => [
    {
      id: "1",
      name: "Shipping Info",
      details: "Add address to complete your purchase",
      component: Shippinginfo,
    },
    {
      id: "2",
      name: "Billing Details",
      details: "This is to verify you’re an authorized user of the purchasing credit card you intend to use",
      component: Bilingdetails,
    },
    {
      id: "3",
      name: "Payments",
      details: "Make Payments for your order",
      component: PaymentDetails,
    },
  ], []);

  if (isLoading || !isAuthenticated || loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <header>
        <nav className="border-b-[1px] bg-white">
          <div className="py-3 px-4 flex max-w-[1366px] mx-auto flex-row justify-between items-center">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-[150px]" />
            </Link>
            <Link to="/cart" className="font-[700] text-sm text-regal-sky-blue">
              Back to Cart
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto max-w-[1200px] py-5 px-2 md:px-4 md:flex md:flex-row md:py-10">
        <div className="mb-5 w-full">
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" onSubmit={handleSubmit}>
            <div className="space-y-8 col-span-2">
              <TabComponent tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} data={data} handleChange={handleChange} />
            </div>
            <div>
              <OrderSummary cartDetails={cartDetails} data={data} />
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
