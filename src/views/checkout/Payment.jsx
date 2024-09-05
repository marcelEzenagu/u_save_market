import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import CategoryList from "../../components/cards/CategoryList";
import Navigation from "../../components/Navigation/Navigation";
import PaymentSuccess from "../../assets/images/payment/success.png";
import PaymentCancel from "../../assets/images/order/cancel.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { setOrders } from "../../features/order/orderSlice";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useGetUserCartQuery } from "../../features/cart/cartApiSlice";
useGetUserCartQuery
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
  const api = import.meta.env.VITE_APP_API_URL
  useEffect(() => {
    // Fetch cart details (replace with actual API call to fetch cart)
    const fetchCartDetails = async () => {
      try {
        const response = await fetch(`${api}carts/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`, // Add the token to the Authorization header
          }, });
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
    if (cartDetails?.products?.length > 0 && !placeOrder) {
      handleOrderCreate();
    // } else {
    //   const timeoutId = setTimeout(() => {
    //     navigate("/checkout");
    //   }, 1000); 
  
    //   // Cleanup if component unmounts before navigation
    //   return () => clearTimeout(timeoutId);
    // }
}
  }, [cartDetails, placeOrder]);


  const {
    data: cartDetailsList,
    isLoading: loadingData,
    isSuccess,
    isError,
    error,
    refetch, // You will use this to refetch cart details
  } = useGetUserCartQuery(userData, {
    skip: !userData && !order, // Skip fetching if no user data
  });

  useEffect(() => {
    if (order) {
      // Call refetch to reload the cart
      refetch();
    }
  }, [order, refetch]);

  const handleOrderCreate = useCallback(async () => {
    let isMounted = true;  // Track component mounted state
    setPlaceOrder(true);

    try {
      let total = cartDetails?.products?.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0
      );
  
      const CheckoutDetails = JSON.parse(localStorage.getItem("checkoutDetails"));
      const totalCost = total + CheckoutDetails?.shippingPay;
  
      const orderPayload = {
        cartID: cartDetails?.cartID,
        products: cartDetails?.products,
        totalCost: totalCost,
        userID: userData?.userID,
      };

      // Post the order using fetch (or you can use axios if preferred)
      const response = await fetch(`${api}orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Error creating order');
      }

      const orderDetails = await response.json();
  
      if (isMounted) {
        setErrMsg(null);
        dispatch(setOrders([orderDetails]));
        setOrder(orderDetails);
        handleRemoveAllCartAfterCreateOrder();
        localStorage.removeItem("checkoutDetails")
      }
    } catch (err) {
      if (isMounted) {
        console.log(err);
        setErrMsg("Something went wrong. Please try again.");
      }
    }

    return () => {
      isMounted = false;  // Cleanup when component unmounts
    };
  }, [cartDetails, dispatch, handleRemoveAllCartAfterCreateOrder, userData, userToken]);

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

export default Payment;
