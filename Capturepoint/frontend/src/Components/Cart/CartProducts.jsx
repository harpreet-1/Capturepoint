import React from "react";
import CartProductCard from "./CartProductCard";

function CartProducts({ data }) {
  return (
    <div className="cart_products">
      {data &&
        data.map((product, index) => {
          return <CartProductCard key={index} product={{ ...product }} />;
        })}
    </div>
  );
}

export default CartProducts;
