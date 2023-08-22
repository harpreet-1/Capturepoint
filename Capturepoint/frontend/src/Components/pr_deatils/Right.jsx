import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../Context/LoginSignupContext";
import Islogin from "../../helper/Islogin";

function Right({ data }) {
  let navigate = useNavigate();
  let { prId } = useParams();

  const [productInCart, setproductInCart] = useState(null);
  const [addToCartBtnText, setaddToCartBtnText] = useState("Add To Cart");

  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const { isLogin, handleLoginClick } = useAuthContext();

  const productDetails = {
    savings: "70.00",
    discount: "14%",
    discountMessage:
      "Regular Price: $498.00 - Instant Rebate: $70.00 = $428.00 Sale price ends on 01/21/23",
  };

  const handleAddToCart = () => {
    if (addToCartBtnText === "Added To Cart") return navigate("/cart");
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/cart/add-to-cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/Json",
          "auth-token": token,
        },
        body: JSON.stringify({
          quantity,
          productId: prId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setaddToCartBtnText("Added To Cart");
          if (data.message === "Product added to cart.") {
            setproductInCart(data.newCartItem);
          }
          if (data.message === "Product quantity updated.") {
            setproductInCart(data.existingCartItem);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrement = () => {
    if (
      quantity > 1 &&
      productInCart &&
      quantity - 1 !== productInCart.quantity
    ) {
      setaddToCartBtnText("Update Quantity");
    } else if (productInCart && quantity > 1) {
      setaddToCartBtnText("Added To Cart");
    }

    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleIncrement = () => {
    if (productInCart && quantity + 1 !== productInCart.quantity) {
      setaddToCartBtnText("Update Quantity");
    } else if (productInCart) {
      setaddToCartBtnText("Added To Cart");
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  function checkIsCartAdded(url) {
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Product is already in the cart.") {
            setproductInCart(data.existingCartItem);
            setQuantity(data.existingCartItem.quantity);
            setaddToCartBtnText("Added To Cart");
          } else {
            alert("not in cart");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const isAddedInCartApi = `${process.env.REACT_APP_BASE_URL}/cart/check-in-cart/${prId}`;
    if (isLogin) checkIsCartAdded(isAddedInCartApi);

    window.scrollTo({ top: 0 });
  }, [prId]);

  return (
    <div className="right">
      <div className="share">
        <span>Share:</span>
        <i className="fa-solid fa-share-from-square"></i>
      </div>
      <p className="model">SPECIAL</p>
      <h1 className="pr_details_title">{data.name}</h1>
      <p className="model">
        <span>SKU: GPHERO10HB</span>
        <span> MFR: CHDRB-101-TH</span>
      </p>
      <div className="rating">
        {<i className="fa-solid fa-star"></i>}
        {[...Array(data.rating || 4)].map((_, starIndex) => (
          <i key={starIndex} className="fa-solid fa-star"></i>
        ))}
      </div>
      <div className="price_box">
        <div className="price">
          <h1>$</h1>
          <h1 id="now_price">{data.price}</h1>
        </div>
        <div className="save">
          <p>You Save:</p>
          <p>
            ${productDetails.savings} ({productDetails.discount})
          </p>
        </div>
        <div className="or">
          <span>OR</span>
        </div>
        <div className="financing">
          <p>
            <b>$72 </b> /mo suggested payments with 6‑month special financing.
            <Link to=" Learn how."> Learn how.</Link>
          </p>
        </div>
      </div>
      <p className="price_discount">{productDetails.discountMessage}</p>

      <div className="button_box">
        {/* ... Quantity section ... */}
        <div className="quantity">
          <div id="quantity">{quantity}</div>
          <div>
            <i
              id="increment"
              className="fa-solid fa-caret-up"
              onClick={handleIncrement}
            ></i>
            <i
              id="decrement"
              className="fa-solid fa-caret-down"
              onClick={handleDecrement}
            ></i>
          </div>
        </div>
        <div
          onClick={() => {
            if (isLogin) {
              return handleAddToCart();
            }
            handleLoginClick();
          }}
          id="addtocart"
        >
          <span>{addToCartBtnText}</span>
        </div>
      </div>

      <div className="stock_des">
        <div>
          <i className="fa-solid fa-square-check"></i>
          <span>In Stock & Ready to Ship</span>
        </div>

        <div>
          <i className="fa-solid fa-truck"></i>
          <Link to="">Calculate Shipping See all shipping options</Link>
        </div>
      </div>
    </div>
  );
}

export default Right;
