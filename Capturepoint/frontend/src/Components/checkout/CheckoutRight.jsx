import React from "react";
import { Link } from "react-router-dom";
function CheckoutRight() {
  return (
    <div class="right">
      <header>
        <h2>Cart Summary</h2>
      </header>
      <div class="total_details">
        <div class="subtotal">
          <div>
            <p>Subtotal</p>
          </div>
          <div class="subtotal_element">
            <span>$</span> <span id="sub_total">6554</span>
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
        <div id="order_total" class="order_total">
          <div>
            <h3>Order Total</h3>
          </div>
          <div>
            <span>
              <h3 id="dollor" class="dollor">
                $
              </h3>
            </span>
            <h3 id="total_order_element" class="total_order_element">
              767
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutRight;
