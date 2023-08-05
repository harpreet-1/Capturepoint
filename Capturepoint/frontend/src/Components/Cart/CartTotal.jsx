import React from "react";
import { Link } from "react-router-dom";

function CartTotal() {
  return (
    <div class="cart_total_box">
      <header>
        <h2>Cart Summary</h2>
      </header>
      <div class="total_details">
        <div class="subtotal">
          <div>
            <p>Subtotal</p>
          </div>
          <div class="subtotal_element">
            <span>$</span> <span id="sub_total">0</span>
          </div>
        </div>
        <p>Sipping</p>
        <div class="charge">
          <Link className="a_link" to="">
            UPS Worldwide Express
          </Link>{" "}
          <span>$64</span>
        </div>
        <div class="taxes">
          <div>Taxes</div>
          <div>$0</div>
        </div>
        <div class="order_total">
          <div>
            <h3>Order Total</h3>
          </div>
          <div>
            <span>
              <h3 class="dollor">$</h3>
            </span>
            <h3 class="total_order_element">767</h3>
          </div>
        </div>

        <div class="checkout_btn">Proceed to Checkout</div>
      </div>
    </div>
  );
}

export default CartTotal;
