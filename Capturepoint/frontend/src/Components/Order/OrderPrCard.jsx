import React, { useState } from "react";

import OrderProductDetails from "./OrderProductDetails";
import OrderPrHeader from "./OrderPrHeader";
import OrderPrFooter from "./OrderPrFooter";
const token = localStorage.getItem("token") || null;

function OrderPrCard({ orderData }) {
  console.log("OrderPrCard");
  const [showDetails, setShowDetails] = useState(false);
  const [order, setOrder] = useState(orderData);
  function fetchOrderbyId() {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/order/single/${orderData._id}`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("from single producr************", data);
          if (data.message === "Invalid token.") {
            // return handleLoginClick();
          }
          if (data.success) {
            setOrder(data.orders);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    order && (
      <div className="ordercard">
        <OrderPrHeader
          order={order}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          setOrder={setOrder}
        />

        {showDetails && (
          <OrderProductDetails fetchOrderbyId={fetchOrderbyId} order={order} />
        )}

        <OrderPrFooter order={order} />
      </div>
    )
  );
}

export default OrderPrCard;
