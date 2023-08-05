import React from "react";
import { Link } from "react-router-dom";
function CartProductCard({ product }) {
  return (
    <div class="product">
      <div class="item_info">
        <div class="cart_image">
          <img id="image" src={product.image} alt="" />
        </div>
        <div class="cart_item_name">
          <h3 id="title">{product.title}</h3>
          <span class="model"> SKU: IEST770320 </span>
          <div class="stock">
            <i class="fa-solid fa-square-check"></i>
            <span>In Stock & Ready to Ship</span>
          </div>
        </div>
        <div id="quantity">
          <div>1</div>

          <div>
            <i class="fa-solid fa-caret-up"></i>
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
        <div class="item_price">
          <p>
            <span>$</span>
            <span class="price_element">{product.price}</span>
          </p>
        </div>
      </div>
      <div class="buttons_item">
        <div class="savefor_later">
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
        <div class="remove_button">
          <div>Remove</div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
