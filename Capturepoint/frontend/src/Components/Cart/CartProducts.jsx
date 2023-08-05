import React from "react";
import CartProductCard from "./CartProductCard";

function CartProducts() {
  const products = [
    {
      id: 1,
      image: "https://www.adorama.com/images/Large/iest770320.jpg",
      title:
        "Epson T770 UltraChrome PRO10 Vivid Magenta Ink Cartridge for SureColor P700,25ml",
      model: "SKU: IEST770320",
      stockMessage: "In Stock & Ready to Ship",
      price: 37.99,
    },
    // Add other products here...
  ];
  return (
    <div class="cart_products">
      {products.map((product) => {
        return <CartProductCard product={{ ...product }} />;
      })}
    </div>
  );
}

export default CartProducts;
