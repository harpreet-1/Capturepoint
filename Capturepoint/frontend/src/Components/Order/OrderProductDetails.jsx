import React from "react";

import OrderSinglePr from "./OrderSinglePr";

function OrderProductDetails({ order, fetchOrderbyId }) {
  let originalDate = new Date(order.createdAt);
  let deleverydate = new Date(originalDate);
  deleverydate.setDate(originalDate.getDate() + 4);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  originalDate = originalDate.toLocaleDateString("en-US", options);
  deleverydate = deleverydate.toLocaleDateString("en-US", options);

  return order.products.map((productDetail, index) => {
    return (
      <>
        {!productDetail.cancelled && productDetail.product && (
          <OrderSinglePr
            key={productDetail._id}
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
