import React, { useEffect, useState } from "react";
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
function Checkout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const { isLoading, isAuthenticated } = useAuth();
  const {cart} = useSelector((state)=> state?.cart);
  console.log(cart);
  const tabs = [
    {
      id: "1",
      name: "Shipping Info",
      details: "Add address to complete your purchase",
      component: Shippinginfo,
    },
    {
      id: "2",
      name: "Billing Details",
      details:
        "This is to verify you’re an authorized user of the purchasing credit card you intend to use",
      component: Bilingdetails,
    },
    {
      id: "3",
      name: "Payments",
      details: "Make Payments for your order",
      component: PaymentDetails,
    },
  ];
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
  const userData = useSelector(selectCurrentUser);
  const {
    data: cartDetails,
    isLoading: loading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserCartQuery(userData, {
    skip: userData === null ? true : false,
  });

  useEffect(() => {
    if (!userData) return;
    setData({
      ...data,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
      email: userData?.email,
    });
  }, [userData]);

  if (isLoading || !isAuthenticated) {
    return <LoadingScreen />;
  }

  const handleChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };

  let total = cartDetails?.products?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );
  let estTotal = total + data?.shippingPay;

  function validateForm(data) {
    // List of required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "street",
      "country",
      "city",
      "state",
      "zipCode",
      "cardHolderName",
      "cardNumber",
      "expiry",
      "cvv",
      "shippingPay",
    ];

    // Iterate through the required fields
    for (const field of requiredFields) {
      if (
        data[field] === "" ||
        data[field] === null ||
        data[field] === undefined
      ) {
        // Alert the user of the empty field
        alert(`The ${field} field is required and cannot be empty.`);
        return false; // Stop the function if an empty field is found
      }
    }

    return true; // All required fields are filled
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Usage
    if (validateForm(data)) {
      // Proceed with form submission or other logic
      localStorage.setItem('checkoutDetails',
        JSON.stringify({
          ...data
        }))
      navigate("/payment");
    } else {
      // Handle the validation error
    }
  };
  return (
    <div>
      <header>
        <nav className="border-b-[1px] bg-white ">
          <div className=" py-3 px-4 flex max-w-[1366px] mx-auto flex-row justify-between items-center lg:container-fluid  ">
            <div className="flex flex-row justify-between items-center">
              <Link to="/">
                <img src={Logo} alt="" className="w-[150px]" />
              </Link>
            </div>

            <Link to="/cart" className="font-[700] text-sm text-regal-sky-blue">
              Back to Cart
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto  max-w-[1200px]  py-5 px-2  md:px-4  md:flex md:flex-row md:py-10">
        <div className="mb-5 w-full">
          <form
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 md:col-span-2">
              {tabs.map((e, i) => (
                <div
                  className=" border shadow-sm bg-white py-4 md:py-6  rounded-xl "
                  key={i}
                >
                  <div className="px-4  md:px-6">
                    <div className="flex flex-row items-center justify-between">
                      <h6 className="text-regal-blue text-sm md:text-[16px] mb-4 font-[700]">
                        {e.id}.{e.name}
                      </h6>
                      {e.id !== activeTab && (
                        <button
                          className="text-regal-sky-blue text-xs md:text-sm mb-4 font-[700] active:scale-95"
                          onClick={() => {
                            setActiveTab(e.id);
                          }}
                        >
                          Show more
                        </button>
                      )}
                    </div>
                    <h6 className="text-regal-light-gray text-xs md:text-sm ">
                      {e.details}
                    </h6>
                  </div>
                  {e.id === activeTab && (
                    <e.component
                      data={data}
                      handleChange={handleChange}
                      setActiveTab={(e) => {
                        setActiveTab(e);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className=" border shadow-sm bg-white py-4 rounded-xl ">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div>
                    <h5 className="text-sm text-regal-blue font-[700] px-4">
                      Order Summary
                    </h5>
                    <div className="flex flex-row justify-between items-start m-4">
                      <div className="">
                        <h6 className="text-sm font-[500] text-regal-black">
                          Subtotal
                        </h6>
                        <p className="text-xs font-[500] text-regal-light-gray">
                          {cartDetails?.products?.length} items
                        </p>
                      </div>
                      <p className="text-sm font-[600] text-regal-black">
                        ₦{numberWithCommas(total)}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between items-start m-4">
                      <div className="">
                        <h6 className="text-sm font-[500] text-regal-black">
                          Estimated Shipping
                        </h6>
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
                        <h6 className="text-sm font-[500] text-regal-black">
                          Est.Total
                        </h6>
                      </div>
                      <p className="text-lg font-[600] text-regal-black px-4">
                        ₦{numberWithCommas(estTotal)}
                      </p>
                    </div>
                    <div className="px-4 py-2 w-full">
                      <button

                        className="text-sm bg-regal-sky-blue text-white px-4  py-2 font-semibold w-full rounded-md hover:bg-blue-600 "
                      >
                        Pay now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
