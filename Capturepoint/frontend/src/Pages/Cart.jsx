import React, { useEffect } from "react";
import "../CSS/cart/cart.css";
import CartProducts from "../Components/Cart/CartProducts";
import CartTotal from "../Components/Cart/CartTotal";
import CartHead from "../Components/Cart/CartHead";
// import NewReleased from "../Components/home/NewReleased";
import Footer from "../Components/home/Footer";
import { useAuthContext } from "../Context/LoginSignupContext";
import { useCartContext } from "../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLogin } = useAuthContext();

  const { setMyCartTotal, myCartData, setMyCartData, cartUpdated } =
    useCartContext();
  const token = localStorage.getItem("token") || null;
  if (!isLogin) {
    const { from } = location.state || { from: { pathname: "/" } };
    navigate(from);
  }
  function fetchCartData() {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/cart/my-cart`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // if(data.length===0&&isLogin){

          // }
          if (!isLogin) {
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
          } else {
            console.log(data);
            setMyCartData(data[0]?.cartItems || []);
            setMyCartTotal(Math.floor(data[0]?.totalAmount) || 0);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCartData();
  }, [cartUpdated]);

  return (
    <>
      <CartHead />
      {myCartData.length ? (
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
