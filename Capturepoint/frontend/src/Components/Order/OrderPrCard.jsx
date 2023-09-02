import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlertContext } from "../../Context/AlertContext";
function OrderPrCard({
  order,
  SetShowOrderCancleConfirm,
  handleCancleProductYes,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const { showAlert } = useAlertContext();
  const token = localStorage.getItem("token");
  let originalDate = new Date(order.createdAt);
  let deleverydate = new Date(originalDate);
  deleverydate.setDate(originalDate.getDate() + 4);

  // Formatting the dates
  const options = {
    // weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  originalDate = originalDate.toLocaleDateString("en-US", options);
  deleverydate = deleverydate.toLocaleDateString("en-US", options);

  const { streetAddress, floor, city, state, pincode } = order.shippingAddress;
  const address = `${streetAddress} ,floor: ${floor} , ${city} ,  ${state} , ${pincode}`;
  // cancel-product/:orderId/:productId
  function handleCancleProductYes() {
    handleCancleProduct();
  }
  function handleCancleProduct(productId) {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/order/cancel-product/${order._id}/${productId}`;
      console.log(order._id, productId);
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/Json",
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          showAlert(data.message, "success", 2000);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="ordercard">
      <div className="orderCardHeader">
        <h4> {originalDate} </h4>
        <p className="orderPrdetails">
          User : <span>Harry</span>
        </p>

        <p className="orderPrdetails">
          Status : <span>{order.orderStatus}</span>
        </p>

        <select className="form-select" aria-label="Default select example">
          <option value="">Update Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button
          onClick={toggleDetails}
          className="btn showDetailsbtn btn-secondary"
        >
          Show Details
        </button>
      </div>

      {showDetails &&
        order.products &&
        order.products.map(
          ({ product, cancelled, price, quantity, _id }, index) => {
            return (
              <div key={index} className={`orderCardBody`}>
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
                    <p className="orderPrCardQuantity">
                      Status : {cancelled ? "cancelled" : order.orderStatus}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleCancleProduct();
                      }}
                      className="cancleOrderbtn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        )}

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
