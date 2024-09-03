import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
     "Loading...",
    "Gathering ingredients...",
    "Firing up the grill...",
    "Just a moment more...",
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     {/* Spinner */}
     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
     
     {/* Loading Text */}
     <p className="text-lg font-semibold text-gray-700">   {messages[messageIndex]}</p>
   </div>
  );
};

export default LoadingScreen;
