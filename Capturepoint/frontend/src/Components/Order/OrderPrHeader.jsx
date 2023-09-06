import React, { useRef, useState } from "react";
import { useAlertContext } from "../../Context/AlertContext";
import AlertModel from "../modals/AlertModal";

function OrderPrHeader({ order, setShowDetails, showDetails, setOrder }) {
  const { showAlert } = useAlertContext();

  const isAdminPage = window.location.pathname.startsWith("/admin");
  const token = localStorage.getItem("token");
  let originalDate = new Date(order.createdAt);

  originalDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  function updateOrderStatus(status) {
    if (!status) return;
    try {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/orders/update-status/${order._id}?status=${status}`,
        {
          method: "PATCH",
          headers: {
            "auth-token": token,
            "Content-Type": "Application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            showAlert(`Order Status Updated to ${status}`, "success");
            return setOrder({ ...order, orderStatus: status });
          }
          showAlert(data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="orderCardHeader">
        <h4> {originalDate} </h4>
        <p className="orderPrdetails">
          Name : <span>{order.shippingAddress.username}</span>
        </p>
        <p className="orderPrdetails">
          Status : <span>{order.orderStatus}</span>
        </p>
        {isAdminPage && (
          <select
            disabled={order.orderStatus === "Delivered"}
            onChange={(e) => {
              updateOrderStatus(e.target.value);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Update Status</option>
            {order.orderStatus <= "Pr" && (
              <option value="Processing">Processing</option>
            )}
            {order.orderStatus <= "S" && (
              <option value="Shipped">Shipped</option>
            )}
            <option value="Delivered">Delivered</option>
          </select>
        )}
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="btn showDetailsbtn btn-secondary"
        >
          {!showDetails ? "Show Details" : "Hide Details"}
        </button>
      </div>
    </div>
  );
}

export default OrderPrHeader;
