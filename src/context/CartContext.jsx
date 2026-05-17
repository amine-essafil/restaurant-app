import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (meal) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === meal.id);
      
      if (existingItem) {
        // Item already in cart - increment quantity
        return prevItems.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // New item - add with quantity 1
        return [...prevItems, { ...meal, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (mealId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== mealId)
    );
  };

  const updateQuantity = (mealId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === mealId ? { ...item, quantity } : item
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};