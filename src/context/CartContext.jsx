// This is the "brain" for your shopping cart.
// It will provide the cart data and functions to all components.

import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider component that will "wrap" your app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Function to add an item to the cart
  const addToCart = (itemToAdd) => {
  setCartItems((prevItems) => {
    // Chercher si le plat existe déjà
    const existingItem = prevItems.find(
      (item) => item.plat_id === itemToAdd.id
    );

    if (existingItem) {
      // S'il existe, on augmente la quantité
      return prevItems.map((item) =>
        item.plat_id === itemToAdd.id
          ? { ...item, quantite: item.quantite + 1 }
          : item
      );
    } else {
      // Sinon, on l'ajoute au panier
      return [
        ...prevItems,
        {
          plat_id: itemToAdd.id, // ID du plat
          quantite: 1, // quantité
          plat: itemToAdd, // toutes les infos du plat
        },
      ];
    }
  });
};




  // The "value" is what all child components will have access to
  const value = {
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};