import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { useAuthContext } from "../../Context/LoginSignupContext";

function CheckoutRight() {
  const { myCartTotal, setMyCartTotal } = useCartContext();
  const { isLogin } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  if (!location.state || location.state.from !== "/cart" || !isLogin) {
    navigate("/cart");
  }
  let total = myCartTotal;
  useEffect(() => {
    setMyCartTotal(location.state?.total);
  });
  return (
    <div className="right">
      <header>
        <h2>Cart Summary</h2>
      </header>
      <div className="total_details">
        <div className="subtotal">
          <div>
            <p>Subtotal</p>
          </div>
          <div className="subtotal_element">
            <span>$</span> <span id="sub_total">{total}</span>
          </div>
        </div>
        <p>Sipping</p>
        <div className="charge">
          <Link className="a_link" to="">
            UPS Worldwide Express
          </Link>{" "}
          <span>$64</span>
        </div>
        <div className="taxes">
          <div>Taxes</div>
          <div>$0</div>
        </div>
        <div id="order_total" className="order_total">
          <div>
            <h3>Order Total</h3>
          </div>
          <div>
            <span>
              <h3 id="dollor" className="dollor">
                $
              </h3>
            </span>
            <h3 id="total_order_element" className="total_order_element">
              {total + 64}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutRight;
