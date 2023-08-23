import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../Context/LoginSignupContext";
import { useAlertContext } from "../../Context/AlertContext";

function Right({ data, prUpdated, setPrUpdated }) {
  const { showAlert } = useAlertContext();
  console.log(data);
  console.log("right");

  let { prId } = useParams();

  const [productInCart, setproductInCart] = useState(null);
  const [isReachmax, setIsReachmax] = useState(false);
  const [addToCartBtnText, setaddToCartBtnText] = useState("Add To Cart");
  const [isOutOfStock, setIsOutOfStock] = useState(
    data.stockQuantity ? false : true
  );

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
    if (addToCartBtnText === "Added To Cart") {
      return;
    }
    let url = `${process.env.REACT_APP_BASE_URL}/cart/add-to-cart/`;
    let payload = {
      quantity,
      productId: prId,
    };
    if (productInCart) {
      url = `${process.env.REACT_APP_BASE_URL}/cart/update-cart-quantity/${productInCart._id}`;
      payload.oldQuantity = productInCart.quantity;
    }
    console.log(url);
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/Json",
          "auth-token": token,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          showAlert(res.message, "success", 1000);

          if (res.maxQuantity) {
            setPrUpdated((prev) => !prev);
            setQuantity(res.maxQuantity);
          }

          if (res.newQuantity || res.success) {
            setaddToCartBtnText("Added To Cart");
            setPrUpdated((prev) => !prev);
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
    if (isOutOfStock && quantity > 1) {
      setIsOutOfStock(false);
    }
  };
  const handleIncrement = () => {
    if (
      productInCart &&
      productInCart.quantity === quantity + 1 &&
      productInCart.stockQuantity === 0
    ) {
      setIsOutOfStock(true);
      return;
    }
    if (isOutOfStock) {
      return;
    }

    if (productInCart) {
      if (quantity + 1 - productInCart.quantity > data.stockQuantity) {
        setIsReachmax(true);
        setTimeout(() => {
          setIsReachmax(false);
        }, 2000);
        return;
      }
    } else {
      if (quantity + 1 > data.stockQuantity) {
        setIsReachmax(true);
        setTimeout(() => {
          setIsReachmax(false);
        }, 2000);
        return;
      }
    }
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
            console.log(data.existingCartItem.productId.stockQuantity);
            // setIsOutOfStock(
            //   data.existingCartItem.productId.stockQuantity ? false : true
            // );
            setIsOutOfStock(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const isAddedInCartApi = `${process.env.REACT_APP_BASE_URL}/cart/check-in-cart/${prId}`;
    if (isLogin) {
      checkIsCartAdded(isAddedInCartApi);
    }
    if (!isLogin) {
      setaddToCartBtnText("Add To Cart");
      setQuantity(1);
      setproductInCart(null);
    }
  }, [prId, prUpdated, isLogin]);
  useEffect(() => {
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

      {(isLogin || productInCart || !isOutOfStock) && (
        <div className="button_box">
          {/* ... Quantity section ... */}
          {(productInCart || !isOutOfStock) && (
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
          )}
          {(!isOutOfStock || productInCart) && (
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
          )}
        </div>
      )}

      {isReachmax && (
        <p className="maxavailable">No more quanitity available in Stock</p>
      )}
      {isOutOfStock ? (
        <div className="messageBox">Out of Stock</div>
      ) : (
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
      )}
    </div>
  );
}

export default Right;
