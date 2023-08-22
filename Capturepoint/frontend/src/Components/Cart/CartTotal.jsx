import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";

function CartTotal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { myCartTotal } = useCartContext();
  return (
    myCartTotal && (
      <div className="cart_total_box">
        <header>
          <h2>Cart Summary</h2>
        </header>
        <div className="total_details">
          <div className="subtotal">
            <div>
              <p>Subtotal</p>
            </div>
            <div className="subtotal_element">
              <span>$</span> <span id="sub_total">{myCartTotal}</span>
            </div>
          </div>
          <p>Sipping</p>
          <div className="charge">
            <Link className="a_link" to="">
              UPS Worldwide Express
            </Link>{" "}
            <span>{myCartTotal && "$64"}</span>
          </div>
          <div className="taxes">
            <div>Taxes</div>
            <div>$0</div>
          </div>
          <div className="order_total">
            <div>
              <h3>Order Total</h3>
            </div>
            <div>
              <span>
                <h3 className="dollor">$</h3>
              </span>
              <h3 className="total_order_element">{myCartTotal + 64}</h3>
            </div>
          </div>

          <div
            className="checkout_btn"
            onClick={() => {
              navigate("/checkout", {
                state: { from: location.pathname, total: myCartTotal },
              });
            }}
          >
            Proceed to Checkout
          </div>
        </div>
      </div>
    )
  );
}

export default CartTotal;
