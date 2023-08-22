import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [myCartTotal, setMyCartTotal] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [myCartData, setMyCartData] = useState([]);

  const contextValue = {
    myCartTotal,
    cartUpdated,
    myCartData,
    setMyCartData,
    setCartUpdated,
    setMyCartTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
