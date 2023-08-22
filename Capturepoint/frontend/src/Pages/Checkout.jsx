import React from "react";
import "../CSS/checkout/checkout.css";

import CheckoutLeft from "../Components/checkout/CheckoutLeft";
import CheckoutRight from "../Components/checkout/CheckoutRight";
function Checkout() {
  return (
    <section className="checkout_main">
      <CheckoutLeft />
      <CheckoutRight />
    </section>
  );
}

export default Checkout;
