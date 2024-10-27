import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from "../../../features/order/orderApiSlice";
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
      order={order? order : []}
    />
  );
}




export default OrderView;
