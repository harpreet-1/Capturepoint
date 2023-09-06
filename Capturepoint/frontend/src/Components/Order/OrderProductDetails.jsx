import React from "react";
import { Link } from "react-router-dom";
import { useAlertContext } from "../../Context/AlertContext";
import OrderCancleConfirmModal from "../modals/OrderCancleConfirmModal";
import OrderSinglePr from "./OrderSinglePr";

function OrderProductDetails({ order, fetchOrderbyId }) {
  let originalDate = new Date(order.createdAt);
  let deleverydate = new Date(originalDate);
  deleverydate.setDate(originalDate.getDate() + 4);

  // Formatting the dates
  const options = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  originalDate = originalDate.toLocaleDateString("en-US", options);
  deleverydate = deleverydate.toLocaleDateString("en-US", options);

  return order.products.map((productDetail, index) => {
    return (
      <>
        {!productDetail.cancelled && (
          <OrderSinglePr
            key={Math.random()}
            fetchOrderbyId={fetchOrderbyId}
            order={order}
            productDetail={productDetail}
          />
        )}
      </>
    );
  });
}

export default OrderProductDetails;
