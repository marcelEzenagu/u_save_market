import React, { useCallback, useEffect, useState } from "react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../../components/Footer/Footer";
import CategoryList from "../../components/cards/CategoryList";
import Navigation from "../../components/Navigation/Navigation";
import PaymentSuccess from "../../assets/images/payment/success.png";
import PaymentCancel from "../../assets/images/order/cancel.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { setOrders } from "../../features/order/orderSlice";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";

// Load Stripe using your public key
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

function Payment() {
  const userData = useSelector(selectCurrentUser);
  const userToken = useSelector(selectCurrentToken);
  const { isLoading, isAuthenticated } = useAuth();
  const [errorMsg, setErrMsg] = useState(null);
  const [order, setOrder] = useState(null);
  const { handleRemoveAllCartAfterCreateOrder } = useCartOperationsHooks();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placeOrder, setPlaceOrder] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const Items = useSelector((state) => state.cart.items || []);

  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);
  const api = import.meta.env.VITE_APP_API_URL;

  // Fetch cart details
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetch(`${api}carts/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setCartDetails(data);
        
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching cart details:", error);
      }
    };

    if (userData && !placeOrder) {
      fetchCartDetails();
    }
  }, [userData, userToken, placeOrder]);


  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(clientSecret);
    });
  }, [stripe, elements]);

 
  useEffect(() => {
    console.log(intentId, status);
    if (intentId && status) {
      if (cartDetails?.products?.length > 0 && !placeOrder) {
        handleOrderCreate();
      }
    }
  }, [cartDetails, placeOrder, intentId, status]);

 
  const handleOrderCreate = useCallback(async () => {
    let isMounted = true;  
    setPlaceOrder(true);

    try {
      console.log("cartDetails==cartDetails::cartDetails=== ",cartDetails)
      let total = cartDetails?.products?.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0
      );

      const CheckoutDetails = JSON.parse(localStorage.getItem("checkoutDetails"));
      console.log("CheckoutDetails::CheckoutDetails=== ",CheckoutDetails)
     
      const totalCost = total + CheckoutDetails?.shippingPay;
      const orderPayload = {
        cartID: cartDetails?.cartID,
        items: cartDetails?.products,
        totalCost: totalCost,
        userID: userData?.userID,
        clientSecret : intentId,
        shippingAddress:CheckoutDetails.shippingDetails,
        billingAddress:CheckoutDetails.billingDetails,
      };

      const response = await fetch(`${api}orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(orderPayload),
      });


      console.log("orderDetails HERE",response)
      if (!response.ok) {
        console.log("ENTERED HERE")
        throw new Error('Error creating order');
      }
      
      const orderDetails = await response.json();
      console.log("orderDetails HERE",orderDetails)
      
      if (isMounted) {
        console.log("orderD222  HERE")
        setErrMsg(null);
        dispatch(setOrders([orderDetails]));
        handleRemoveAllCartAfterCreateOrder();
        setOrder(orderDetails);
        localStorage.removeItem("checkoutDetails");
      }
    } catch (err) {
      if (isMounted) {
        console.log("Something went wrong",err);
        setErrMsg("Something went wrong. Please try again.");
      }
    }

    return () => {
      isMounted = false; 
    };
  }, [cartDetails, dispatch, handleRemoveAllCartAfterCreateOrder, userData, userToken]);

  // Loading screen
  if (isLoading || !isAuthenticated || loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navigation />
      {errorMsg !== null ? (
        <div className="p-14 rounded-lg mx-auto max-w-[400px] text-center">
          <img src={PaymentCancel} alt="Payment Cancelled" className="text-center my-3 mx-auto" />
          <h2 className="text-xl font-bold mb-2">Error creating order</h2>
          <p className="text-regal-black text-sm mt-4 mb-1">{errorMsg}</p>
        </div>
      ) : order ? (
        <div className="p-14 rounded-lg mx-auto max-w-[400px] text-center">
          <img src={PaymentSuccess} alt="Payment Successful" className="text-center my-3 mx-auto" />
          <h2 className="text-xl font-bold mb-2">Payment Successful</h2>
          <p className="text-regal-black text-sm mt-4 mb-1">Thank you for making a purchase with Usavemarket.</p>
          <h6 className="text-regal-black text-sm mt-4 mb-6">
            Order ID <span className="font-[700]">{order?.orderID}</span>
          </h6>
          <div className="flex flex-col gap-4 mx-auto">
            <button className="bg-regal-sky-blue text-white py-3 rounded-md hover:bg-blue-900 transition font-[600] text-xs md:text-sm">
              Back to Home
            </button>
            <button
              onClick={() => navigate(`/orders/view/${order?.orderID}`)}
              className="text-regal-sky-blue py-3 border-2 border-body-color-gray rounded-md hover:border-regal-sky-blue transition font-[600] text-xs md:text-sm"
            >
              Track Order
            </button>
          </div>
        </div>
      ) : (
        <div className="p-14 rounded-lg mx-auto max-w-[400px] text-center">
          <h6 className="text-regal-black text-sm mt-4 mb-6">Creating Order ....</h6>
        </div>
      )}
      <CategoryList />
      <Footer />
    </div>
  );
}


const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWrapper;
