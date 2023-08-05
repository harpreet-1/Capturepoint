import React from "react";
import "../CSS/cart/cart.css";
import CartProducts from "../Components/Cart/CartProducts";
import CartTotal from "../Components/Cart/CartTotal";
import CartHead from "../Components/Cart/CartHead";
import NewReleased from "../Components/home/NewReleased";
import Footer from "../Components/home/Footer";

function Cart() {
  return (
    <>
      <CartHead />
      <section class="main">
        <CartProducts />
        <CartTotal />
      </section>
      <NewReleased />
      <Footer />
    </>
  );
}

export default Cart;
