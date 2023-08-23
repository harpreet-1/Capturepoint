import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";

function CartProductCard({ product }) {
  const { setMyCartTotal, setCartUpdated } = useCartContext();
  // const [product, SetProduct] = useState(productdata);
  console.log("cart product", product);
  const token = localStorage.getItem("token");
  const [showMaxlimit, setShowMaxlimit] = useState(false);

  const [quantity, setQuantity] = useState(product.quantity);
  const updateQuantityTimeout = useRef(null);
  const updateQuantity = useRef(quantity);
  const handleDelete = (cardId) => {
    console.log(cardId);
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/cart/delete/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/Json",
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message == "Product  deleted.") {
            alert(data.message);
            setCartUpdated((prev) => !prev);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = () => {
    if (!updateQuantityTimeout.current) {
      console.log("timeout set");

      updateQuantityTimeout.current = setTimeout(() => {
        console.log("update triggered");
        updateCart();
        updateQuantityTimeout.current = null;
      }, 4000);
    }
  };
  const updateCart = () => {
    console.log(
      "product.quantity",
      product.quantity,
      "stock quanity",
      product.stockQuantity,
      "updateQuantity",
      updateQuantity.current
    );
    if (updateQuantity.current === product.quantity) {
      console.log("same");
      return;
    }

    try {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/cart/update-cart-quantity/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/Json",
            "auth-token": token,
          },
          body: JSON.stringify({
            productId: product.productId,
            quantity: updateQuantity.current,
            oldQuantity: product.quantity,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
          if (data.newQuantity) {
            setCartUpdated((prev) => !prev);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrement = () => {
    if (showMaxlimit) {
      setShowMaxlimit(false);
    }

    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setMyCartTotal((prev) => prev - Math.floor(product.price));
      updateQuantity.current = quantity - 1;
      handleUpdateClick();
    }
  };

  const handleIncrement = () => {
    if (quantity + 1 - product.quantity > product.stockQuantity) {
      setShowMaxlimit(true);
      setTimeout(() => {
        setShowMaxlimit(false);
      }, 1000);
      return;
    }

    setQuantity((prevQuantity) => prevQuantity + 1);
    setMyCartTotal((prev) => prev + Math.floor(product.price));
    updateQuantity.current = quantity + 1;
    handleUpdateClick(quantity + 1);
  };

  return (
    <div id={`cartProduct${product._id}`} className="product">
      <div className="item_info">
        <div className="cart_image">
          <img id="image" src={product.images[0]} alt="" />
        </div>
        <div className="cart_item_name">
          <h3 id="title">{product.name}</h3>
          <span className="model"> SKU: IEST770320 </span>
          <div className="model">{product.description}</div>
          <div className="stock">
            <i className="fa-solid fa-square-check"></i>
            <span>In Stock & Ready to Ship</span>
          </div>
        </div>
        <div id="quantity">
          <div>{quantity}</div>

          <div>
            <i onClick={handleIncrement} className="fa-solid fa-caret-up"></i>
            <i onClick={handleDecrement} className="fa-solid fa-caret-down"></i>
          </div>
        </div>

        <div className="item_price">
          <p>
            <span>$</span>
            <span className="price_element">{product.price}</span>
          </p>
        </div>
      </div>
      {showMaxlimit && <p className="maxlimitmsg">max avalaible item</p>}
      <div className="buttons_item">
        <div className="savefor_later">
          <div>
            <Link className="a_link" to="">
              Save For Later
            </Link>
          </div>
          <div>
            <Link className="a_link" to="">
              Move to Wishlist
            </Link>
          </div>
          <div></div>
        </div>
        <div
          onClick={() => {
            handleDelete(`cartProduct${product._id}`);
          }}
          className="remove_button"
        >
          <div>Remove</div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
