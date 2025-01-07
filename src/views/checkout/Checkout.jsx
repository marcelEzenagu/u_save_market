import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/nav/logo.webp";
import Footer from "../../components/Footer/Footer";
import Shippinginfo from "./component/Shippinginfo";
import Bilingdetails from "./component/Bilingdetails";
// import PaymentDetails from "./component/PaymentDetails";
import { useAuth } from "../../hooks/useAuth";
import { selectCurrentUser } from "../../features/auth/authSlice";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { useGetUserCartQuery } from "../../features/cart/cartApiSlice";
import { numberWithCommas } from "../../utils";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, PaymentElement, useElements, CardElement } from "@stripe/react-stripe-js";
import { useToaster } from "../../components/ToasterContext";
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

const TabComponent = React.memo(
  ({ tabs, activeTab, setActiveTab, data, handleChange }) => {
    return (
      <>
        {tabs?.map((tab) => {
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
                  <Component
                    data={data}
                    handleChange={handleChange}
                    setActiveTab={setActiveTab}
                  />
                )}
              </div>
            );
        })}
      </>
    );
  }
);

const OrderSummary = React.memo(({ cartDetails, data, estTotal, total,  loadingPayment }) => {
  const exchangeRate = useSelector((state)=> state?.auth?.exchangeRate);
  console.log("estTotal:: ",estTotal)
  console.log("data:: ",data)

  console.log("exchangeRate=====",exchangeRate)
  return (
    <div className="border shadow-sm bg-white py-4 mt-5 md:mt-0 rounded-xl ">
      {cartDetails?.loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <h5 className="text-sm text-regal-blue font-[700] px-4">
            Order Summary
          </h5>
          <div className="flex flex-row justify-between items-start m-4">
            <div>
              <h6 className="text-sm font-[500] text-regal-black">Subtotal</h6>
              <p className="text-xs font-[500] text-regal-light-gray">
                {cartDetails?.products?.length} items
              </p>
            </div>
            <p className="text-sm font-[600] text-regal-black">
              {exchangeRate?.currency}{' '}{ numberWithCommas((total * exchangeRate?.rate).toFixed(2))}{" "}

            </p>
          </div>
          <div className="flex flex-row justify-between items-start m-4">
            <div>
              <h6 className="text-sm font-[500] text-regal-black">
                Estimated Shipping
              </h6>
              <p className="text-xs font-[500] text-regal-light-gray">
                {cartDetails?.products?.length} items
              </p>
            </div>
            <p className="text-sm font-[600] text-regal-black">
              {/* ₦{numberWithCommas(data?.shippingPay)} */}
              {exchangeRate?.currency}{' '}{ numberWithCommas((data?.shippingPay * exchangeRate?.rate).toFixed(2))}{" "}

            </p>
          </div>
          <div className="flex flex-row justify-between items-start py-4 border-t">
            <div className="px-4">
              <h6 className="text-sm font-[500] text-regal-black">Est.Total</h6>
            </div>
            <p className="text-lg font-[600] text-regal-black px-4">
              {/* ₦{numberWithCommas(estTotal)} */}
              {exchangeRate?.currency}{' '}{ numberWithCommas(((total + data?.shippingPay)* exchangeRate?.rate).toFixed(2))}{" "}

            </p>
          </div>
          <div className="px-4 py-2 w-full">
            {cartDetails?.products?.length > 0 && (
              <button disabled={loadingPayment}  type="submit"
               className="text-sm bg-regal-sky-blue text-white px-4 py-2 font-semibold w-full rounded-md hover:bg-blue-600">
               {loadingPayment ? "Processing..." : "Pay now"}  
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
});


const PaymentDetails = () => {
  const paymentElementOptions = {
    layout: "tabs"
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h6 className="text-regal-blue text-sm md:text-[16px] mb-4 font-[700]">3. Payment Details</h6>
      <label className="block text-sm font-medium text-regal-black mb-2">
        Credit or debit card
      </label>
      <div className=" mb-4">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {/* <CardElement options={paymentElementOptions} /> */}
      </div>
    </div>
  );
};


function Checkout({clientSecret, estTotal, cartDetails, total, data, setData}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const userData = useSelector(selectCurrentUser);


  const { showToast } = useToaster();
  const stripe = useStripe();
  const elements = useElements();

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

  const handleChange = (section,e) => {
    console.log("e.target.name",e.target.name)
    if(!section){
      setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        
      }));
    }else{
      setData((prevData) => ({
        ...prevData,
      [section]: { ...prevData[section],   [e.target.name]:  e.target.value }
        
      }));

    }
  }

  const oldhandleChange = useCallback((e) => {
    console.log("e.target.name",e.target.value)
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);


  const validateForm = useCallback((formData) => {
    const requiredFields = [
      // "firstName",
      // "lastName",
      // "phoneNumber",
      // "email",
      // "street",
      // "country",
      // "city",
      // "state",
      // "zipCode",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`The ${field} field is required and cannot be empty.`);
        return false;
      }
    }
    return true;
  }, []);



  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        conso3le.log("Stripe.js has not loaded yet.");
        return;
      }
  
      if (validateForm(data)) {
        try {
          if (cartDetails?.products?.length > 0) {

            console.log("DATA::: ",data)
            localStorage.setItem("checkoutDetails", JSON.stringify(data));
            setLoadingPayment(true);
  
            const { error } = await stripe.confirmPayment({
              elements,
              confirmParams: {
                return_url: `${window.location.origin}/payment-success`, // Correctly formatted return URL
              },
            });
  
            if (error) {
              showToast(error.message);
            } else {
              showToast("Payment processing...");
              // You can add further handling here if needed
            }
            setLoadingPayment(false);
          }
        } catch (error) {
          console.log(error);
          setLoadingPayment(false);
          showToast("Something went wrong while processing the payment. Please try again later.", "error");
        }
      }
    },
    [data, cartDetails, elements, stripe, navigate]
  );
  
  
  
  

  const tabs = useMemo(
    () => [
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
      // {
      //   id: "3",
      //   name: "Payments",
      //   details: "Make Payments for your order",
      //   component: PaymentDetails,
      // },
    ],
    []
  );


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
          <form
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:gap-8"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 col-span-2">
              <TabComponent
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                data={data}
                handleChange={handleChange}
               
              />
              <PaymentDetails clientSecret={clientSecret} />
            </div>
            <div>
              <OrderSummary  loadingPayment={loadingPayment} cartDetails={cartDetails} data={data} total={total} estTotal={estTotal} />

            
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutWrapper() {
  
  const [clientSecret, setClientSecret] = useState("");
  const { isLoading, isAuthenticated } = useAuth();
  const token = useSelector(state => state?.auth?.token);
  const cartData = useSelector(state => state?.cart)

  const {
    data: cartDetails,
    isLoading: loading,
    refetch,
  } = useGetUserCartQuery();

  const [data, setData] = useState({
    // firstName: "",
    // lastName: "",
    // phoneNumber: "",
    // email: "",
    // street: "",
    // country: "",
    // city: "",
    // state: "",
    // zipCode: "",
    shippingDetails:{ 
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      street: "",
      country: "",
      city: "",
      isDefault:false,
      state: "",
      zipCode: "",},

      billingDetails:{ 
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      isDefault:false,
      street: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",},
      paymentDetails:{ 
        cvv: "",
        expiry: "",
        cardNumber: "",
        cardHolderName: "",
      isDefault:false,},
    
    // companyName: "",
    // shippingPay: 0,
  });
  const total = useMemo(() => {
    return cartDetails?.products?.reduce(
      (acc, item) => acc + (item.newPrice ? item.newPrice :item.salesPrice) * item?.quantity,
      0
    );
  }, [cartDetails]);
 

  const estTotal = useMemo(() => total + data?.shippingPay, [total]);
 
  useEffect(()=>{
    const getClientKey  = async () => {
      if(total){
        console.log("CART---total::: ",total)
        console.log("CART---estTotal::: ",estTotal)

        const body = { products: cartDetails?.products, totalCost: total };
        console.log("BODY::",body)
        // return 
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}orders/pay-intent`, 
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
  
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      }
    }

    getClientKey();
  }, [cartDetails]);


  const appearance = {
    theme: 'stripe',
  };

  if (isLoading || !isAuthenticated || loading) {
    return <LoadingScreen />;
  }

  if(clientSecret){
    return (
      <Elements options={{   
        clientSecret,
        appearance, }} stripe={stripePromise}>
        <Checkout 
          clientSecret={clientSecret} 
          cartDetails={cartDetails}  
          setData={setData} 
          data={data} 
          estTotal={estTotal} 
          total={total} 
        />

      </Elements>
    );
  }else{
    return <LoadingScreen />;
  }

}