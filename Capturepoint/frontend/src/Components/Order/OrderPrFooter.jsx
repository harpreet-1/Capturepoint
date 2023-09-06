import React from "react";

function OrderPrFooter({ order }) {
  let deleverydate = new Date(order.createdAt);
  deleverydate.setDate(deleverydate.getDate() + 4);

  // Formatting the dates
  const options = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  deleverydate = deleverydate.toLocaleDateString("en-US", options);

  const { streetAddress, floor, city, state, pincode } = order.shippingAddress;
  const address = `${streetAddress} ,floor: ${floor} , ${city} ,  ${state} , ${pincode}`;
  return (
    <div className="orderCardFooter">
      <div className="orderPrCardQuantity">
        <span>Address : </span> {address}
      </div>
      <p className="orderPrCardQuantity">
        Delivery Expected By <span> {deleverydate}</span>
      </p>
      <div className="orderTotalamount">
        Order Total : <span>${order.orderTotal}</span>
      </div>
    </div>
  );
}

export default OrderPrFooter;
