import React, { useEffect, useState } from "react";
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
import { useGetUserCartQuery } from "../../features/cart/cartApiSlice";
import { useCreateUserOrderMutation } from "../../features/order/orderApiSlice";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
function Payment() {
  const userData = useSelector(selectCurrentUser);
  const { isLoading, isAuthenticated } = useAuth();
  const [errorMsg, setErrMsg] = useState(null);
  const [order, setOrder] = useState(null);
  const [createUserOrder, { isLoading: loadingOrder }] =
    useCreateUserOrderMutation();
    const { handleRemoveAll } = useCartOperationsHooks();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const CheckoutDetails = JSON.parse(
    localStorage.getItem("checkoutDetails")
  );
  useEffect(() => {
    if (isSuccess, CheckoutDetails) {
      handleOrderCreate();
    }else{
      navigate('/checkout');
    }
  }, [isSuccess]);

  // useEffect(()=>{

  // }, []);

  const handleOrderCreate = async () => {
    try {
      let total = cartDetails?.products?.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0
      );
      const orderDetails = await createUserOrder({
        cartID: cartDetails?.cartID,
        products: cartDetails?.products,
        totalCost :  total + CheckoutDetails?.shippingPay,
        userID: userData?.userID
      }).unwrap();
      setErrMsg(null);
      dispatch(setOrders([orderDetails]));
      setOrder(orderDetails);
      // handleRemoveAll();
    } catch (err) {
      console.log(err);
      if (err?.status === 200) {
        return;
      } else if (err?.status >= 400 && err?.status <= 404) {
        setErrMsg(err?.data?.message);
      } else if (err?.status >= 500) {
        setErrMsg(err?.data?.message);
      } else {
        setErrMsg("Create Order Failed");
      }
    }
  };

  if (isLoading || !isAuthenticated || loadingOrder || loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navigation />
      {errorMsg !== null ? (
        <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
          <img
            src={PaymentCancel}
            alt=""
            className="text-center my-3 mx-auto"
          />
          <h2 className="text-xl font-bold mb-2">Error creating order</h2>
          <p className="text-regal-black text-sm mt-4 mb-1">
            {errorMsg}
          </p>

        </div>
      ) : (
        order ? <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
        <img
          src={PaymentSuccess}
          alt=""
          className="text-center my-3 mx-auto"
        />
        <h2 className="text-xl font-bold mb-2">Payment Successful</h2>
        <p className="text-regal-black text-sm mt-4 mb-1">
          Thank you for making a purchase with Usavemarket.
        </p>

        <h6 className="text-regal-black text-sm mt-4 mb-6">
          Order ID <span className="font-[700]">{order?.orderID}</span>
        </h6>
        {/* Buttons in flex-col with gap */}
        <div className="flex flex-col gap-4  mx-auto">
          <button className="bg-regal-sky-blue text-white py-3 rounded-md hover:bg-blue-900 transition font-[600]  text-xs md:text-sm">
            Back to Home
          </button>
          <button 
        onClick={()=>{navigate(`/orders/view/${order?.orderID}`)}}
          className=" text-regal-sky-blue py-3 border-2 border-body-color-gray  rounded-md hover:border-regal-sky-blue transition font-[600] text-xs md:text-sm">
            Track Order
          </button>
        </div>
      </div> :
            <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
  
            <h6 className="text-regal-black text-sm mt-4 mb-6">
             Creating Order ....
            </h6>

          </div>
  
      )}

      <CategoryList />
      <Footer />
    </div>
  );
}

export default Payment;
