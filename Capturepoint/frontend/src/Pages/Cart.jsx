import React, { useEffect, useState } from "react";
import "../CSS/cart/cart.css";
import CartProducts from "../Components/Cart/CartProducts";
import CartTotal from "../Components/Cart/CartTotal";
import CartHead from "../Components/Cart/CartHead";

import Footer from "../Components/home/Footer";
import { useAuthContext } from "../Context/LoginSignupContext";
import { useCartContext } from "../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useProgressBarContext } from "../Context/ProgressBarContext";
import ReactLoading from "react-loading";
function Cart() {
  console.log("carrttt");
  const navigate = useNavigate();
  const location = useLocation();
  const { setProgress } = useProgressBarContext();
  const { isLogin, handleLoginClick } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  const { setMyCartTotal, myCartData, setMyCartData, cartUpdated } =
    useCartContext();
  const token = localStorage.getItem("token") || null;

  function fetchCartData() {
    try {
      setProgress(30);
      fetch(`${process.env.REACT_APP_BASE_URL}/cart/my-cart`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!isLogin) {
            console.log(isLogin);
          } else {
            setMyCartData(data[0]?.cartItems || []);
            setMyCartTotal(Math.floor(data[0]?.totalAmount) || 0);
            setProgress(100);
          }
          setTimeout(() => {
            setProgress(0);
          }, 1000);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!isLogin) {
      handleLoginClick();
    }
  }, [isLogin]);
  useEffect(() => {
    fetchCartData();
  }, [cartUpdated, isLogin]);

  if (isLoading) {
    return (
      <div className="react-loading">
        <ReactLoading
          type={"spokes"}
          color={"Black"}
          height={"100vh"}
          width={50}
        />
      </div>
    );
  }
  if (!isLogin) {
    return (
      <div>
        <h1 className="messagetouser">Please Login To See Cart</h1>;
        <div
          className="checkout_btn LoginBtn continueShoppingbtn"
          onClick={() => {
            handleLoginClick();
          }}
        >
          Login
        </div>
      </div>
    );
  }
  return (
    <>
      <CartHead />
      {myCartData && myCartData.length ? (
        <section className="main">
          <CartProducts data={myCartData} />
          <CartTotal />
        </section>
      ) : (
        <div
          className="checkout_btn continueShoppingbtn"
          onClick={() => {
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
          }}
        >
          Continue Shopping
        </div>
      )}
      {/* <NewReleased /> */}
      <Footer />
    </>
  );
}

export default Cart;
