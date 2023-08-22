import React from "react";
import { Link } from "react-router-dom";

function CartHead() {
  return (
    <>
      <section className="cart_head">
        <div>
          <h1 className="cart_heading">Shopping Cart</h1>
        </div>
        <div className="email_link">
          <i className="fa-regular fa-envelope"></i>
          <Link className="a_link" to="/">
            {" "}
            Email My Cart
          </Link>
          <i className="fa-solid fa-phone"></i>
          <span>
            Need Help?Call{" "}
            <Link className="a_link" to="">
              {" "}
              800-811-4002
            </Link>
          </span>
        </div>
      </section>
      <header className="exprss_heading">
        <h2 id="cart_status">Ship - Worldwide Express</h2>
        <h3>Total Items :</h3>
        <span className="total_item">0</span>
      </header>
    </>
  );
}

export default CartHead;
