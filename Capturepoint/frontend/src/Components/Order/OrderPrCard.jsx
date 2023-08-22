import React from "react";
import { Link } from "react-router-dom";
function OrderPrCard({ order }) {
  let originalDate = new Date(order.createdAt);
  let deleverydate = new Date(originalDate);
  deleverydate.setDate(originalDate.getDate() + 4);

  // Formatting the dates
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  originalDate = originalDate.toLocaleDateString("en-US", options);
  deleverydate = deleverydate.toLocaleDateString("en-US", options);

  const { streetAddress, floor, city, state, pincode } = order.shippingAddress;
  const address = `${streetAddress} ,floor: ${floor} , ${city} ,  ${state} , ${pincode}`;
  return (
    <div className="ordercard">
      <div className="orderCardHeader">
        <h4> {originalDate} </h4>
      </div>

      {order.products &&
        order.products.map(({ product, cancelled, price, quantity }, index) => {
          return (
            !cancelled && (
              <div key={index} className="orderCardBody">
                <div className="orderPrCardLeft">
                  <div className="orderPrCardimg">
                    <img src={product.images[0]} alt="image" />
                  </div>
                  <div className="orderPrCardNdetails">
                    <Link to={"/"} className="a_link">
                      <p className="orderPrCardName"> {product.name}</p>
                    </Link>
                    <p className="orderPrCardQuantity">
                      Price : <span>${price}</span>
                    </p>
                    <p className="orderPrCardQuantity">
                      Quanitty : <span>{quantity}</span>
                    </p>
                  </div>
                  <div className="orderPrCardName">
                    Total : ${Math.floor(price * quantity)}
                  </div>
                </div>
                <div className="orderPrCardRight">
                  <div>
                    <p className="orderPrCardQuantity">
                      Delivery Expected By <span> {deleverydate}</span>
                    </p>
                    <p className="orderPrCardQuantity">Status : Shipped</p>
                  </div>
                  <div>
                    <button className="cancleOrderbtn">Cancel</button>
                  </div>
                </div>
              </div>
            )
          );
        })}

      <div className="orderCardFooter">
        <div className="orderPrCardQuantity">
          <span>Address : </span> {address}
        </div>
        <div className="orderTotalamount">
          Order Total : <span>${order.orderTotal}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderPrCard;
