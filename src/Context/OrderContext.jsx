import React, { createContext, useContext, useState } from "react";

// Create the context
const OrderContext = createContext();

// Custom hook to use the context
export const useOrder = () => {
  return useContext(OrderContext);
};

// Provider component
export const OrderProvider = ({ children }) => {
  // State for storing all orders
  const [orders, setOrders] = useState([]);

  // The value object that will be provided to all children
  const value = {
    orders,
    setOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};