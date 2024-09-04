import React, { useState, useRef, useEffect } from "react";
import Status from "../../../components/order/OrderStatus";
import { IoInformationCircle } from "react-icons/io5";
import { Items } from "../../../data/mockData";
import ItemsCard from "../../../components/cards/ItemsCard";
import Cancelicon from "../../../assets/images/order/cancel.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbMapPinFilled } from "react-icons/tb";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from "../../../features/order/orderApiSlice";
import moment from 'moment';
import { numberWithCommas } from "../../../utils";
import OrderViewSkeleton from "../../../components/Loading/OrderViewSkeleton";
import OrderDetails from './OrderDetails'
import TrackOrder from './TrackOrder'
function OrderView() {
  const { id } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(id);
  const [TrackOrderDetails, setTrackOrderDetails] = useState(false);

  if (isLoading) {
    return <OrderViewSkeleton/>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return TrackOrderDetails ? (
    <TrackOrder
    setTrackOrderDetails={(e) => {
      setTrackOrderDetails(e)
    }}
    order={order}
    />
  ) : (
    <OrderDetails
      setTrackOrderDetails={(e) => {
        setTrackOrderDetails(e)
      }}
      order={order}
    />
  );
}




export default OrderView;
