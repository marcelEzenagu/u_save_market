import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Notifications = () => {
  const [shipments, setShipments] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:3600/ws')
    // ,{
    //   transports: ['websocket'],  // Force WebSocket transport
    // }); // Adjust URL as necessary

    // Listen for new shipment events
    socket.on('newShipment', (shipment) => {
      setShipments((prev) => [...prev, shipment]);
      console.log('New shipment received:', shipment);
    });

    
    // Listen for order update events
    socket.on('orderUpdated', (order) => {
      setOrders((prev) => [...prev, order]);
      console.log('Order updated:', order);
    });

    // Clean up the connection on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div>
      <h2>Shipments</h2>
      <ul>
        {shipments?.map((shipment, index) => (
          <li key={index}>{shipment.name} - {shipment.status}</li>
        ))}
      </ul>

      <h2>Orders</h2>
      <ul>
        {orders?.map((order, index) => (
          <li key={index}>{order.id} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
