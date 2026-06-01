import React, { createContext, useContext, useState } from "react";
import { ClientApi } from "../ClientApi/ClientApi";

// Create the context
const OrderContext = createContext();

// Custom hook to use the context
export const useOrder = () => {
  return useContext(OrderContext);
};


export const OrderProvider = ({ children }) => {
  // State for storing all orders
  const [orders, setOrders] = useState([]);

  // State for notification flag
  const [hasNewOrderNotification, setHasNewOrderNotification] = useState(false);

   const [IdLivraison, setIdLivraison] = useState('');
   const [errors, seterrors] = useState({});
   const [Prixtotal, setPrixtotal] = useState();
   const [Idcommande, setIdcommande] = useState('');

const infosItems = async(data) => {
     try {    
        const response =  await ClientApi.Postadresslivraison(data);
          if (response?.status === 201) {
      console.log(' Address created successfully, navigating to payment...');
      console.log(response.data.id); 
       setIdLivraison(response.data.id);
    }
         return response;
         } catch (error) {
            if (error.response?.status === 422) {
       seterrors(error.response.data.errors);
    }
        }};

/*'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'street_address' => 'required|string|max:255',
            'delivery_instructions' => 'nullable|string'*/
  /**
   * Place a new order
   * This function is called when user completes payment
   */
  const placeOrder =async (orderData) => {
       try {
          const response = await ClientApi.PostCommande(orderData);
          console.log(response.data);
    setIdcommande(response.data.commande.id); 
    
    setHasNewOrderNotification(true);
    return response.data.commande.id;
       } catch (error) {
        console.log(error);
       } };


 
  const clearOrderNotification = () => {
    setHasNewOrderNotification(false);
    console.log("🔔 Order notification cleared");
  };

  /**
   * Get the most recent order
   */
  const getLatestOrder = () => {
    return orders.length > 0 ? orders[0] : null;
  };

  /**
   * Update order status (for future use)
   */
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
    console.log(`📦 Order ${orderId} status updated to: ${newStatus}`);
  };

  // The value object that will be provided to all children
  const value = {
    errors,
    infosItems,
    orders,
    hasNewOrderNotification,
    placeOrder,
    clearOrderNotification,
    getLatestOrder,
    updateOrderStatus,IdLivraison,
    setPrixtotal,Idcommande,setOrders

  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};