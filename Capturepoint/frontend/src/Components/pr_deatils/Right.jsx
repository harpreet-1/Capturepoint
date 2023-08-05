import React, { useState } from "react";
import { Link } from "react-router-dom";

function Right() {
  const productDetails = {
    model: "SPECIAL",
    title: "GoPro HERO10 Black Action Camera with Holiday Bundle",
    sku: "GPHERO10HB",
    mfr: "CHDRB-101-TH",
    rating: 4,
    price: "428.00",
    savings: "70.00",
    discount: "14%",
    financingText:
      "$72 /mo suggested payments with 6‑month special financing. Learn how.",
    stockMessage: "In Stock & Ready to Ship",
    shippingOptionsLink: "#",
    discountMessage:
      "Regular Price: $498.00 - Instant Rebate: $70.00 = $428.00 Sale price ends on 01/21/23",
  };
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <div className="right">
      <div className="share">
        <span>Share:</span>
        <i className="fa-solid fa-share-from-square"></i>
      </div>
      <p className="model">SPECIAL</p>
      <h1 className="pr_details_title">
        GoPro HERO10 Black Action Camera with Holiday Bundle
      </h1>
      <p className="model">
        <span>SKU: GPHERO10HB</span>
        <span> MFR: CHDRB-101-TH</span>
      </p>
      <div className="rating">
        {<i className="fa-solid fa-star"></i>}
        {[...Array(5)].map((_, starIndex) => (
          <i key={starIndex} className="fa-solid fa-star"></i>
        ))}
      </div>
      <div className="price_box">
        <div className="price">
          <h1>$</h1>
          <h1 id="now_price">{productDetails.price}</h1>
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
        <div id="addtocart">
          <span>Add to Cart</span>
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
