import React, { createContext, useState, useContext } from 'react';
import Toaster from './Toaster';
// Create a context for the toaster
const ToasterContext = createContext();

// Create a provider component
export const ToasterProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToasterContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      {toast && <Toaster {...toast} onClose={hideToast} />}
    </ToasterContext.Provider>
  );
};

// Custom hook to use the toaster context
export const useToaster = () => useContext(ToasterContext);
