import React, { useEffect } from 'react';

const Toaster = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const toasterStyles = {
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white',
  };

  const icons = {
    info: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 6v2m0 4v4m-4 4h8a1 1 0 001-1v-7a1 1 0 00-1-1h-8a1 1 0 00-1 1v7a1 1 0 001 1z" />
      </svg>
    ),
    success: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 6v2m0 4v4m-4 4h8a1 1 0 001-1v-7a1 1 0 00-1-1h-8a1 1 0 00-1 1v7a1 1 0 001 1z" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
<div className={`fixed top-0 left-0 w-full px-4 py-2 z-50 rounded shadow-lg flex items-center justify-center ${toasterStyles[type]}`}>
  <div className="flex items-center max-w-screen-lg w-full justify-center">
    {icons[type]}
    <span className="ml-2">{message}</span>
  </div>
  <button className="ml-4 text-lg font-bold" onClick={onClose}>
    &times;
  </button>
</div>

  );
};

export default Toaster;
