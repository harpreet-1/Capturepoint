import React, { useEffect, useState } from "react";
import "../CSS/Orders/order.css";

import OrderPrCard from "../Components/Order/OrderPrCard";
import { useAuthContext } from "../Context/LoginSignupContext";
import { useProgressBarContext } from "../Context/ProgressBarContext";
import OrderCancleConfirmModal from "../Components/modals/OrderCancleConfirmModal";

function Orders() {
  const { setProgress } = useProgressBarContext();
  const { handleLoginClick, isLogin } = useAuthContext();
  const [orderData, setOrderData] = useState([]);
  const [orderDataLoading, setOrderDataLoading] = useState(true);
  const token = localStorage.getItem("token") || null;
  const [showOrderCancleConfirm, setShowOrderCancleConfirm] = useState(false);
  function hidemodal() {
    setShowOrderCancleConfirm(false);
  }

  function fetchOrderData() {
    try {
      setProgress(20);
      fetch(`${process.env.REACT_APP_BASE_URL}/order/my`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrderDataLoading(false);
          console.log(data);
          if (data.message === "Invalid token.") {
            return handleLoginClick();
          }
          if (data.success) {
            setOrderData(data.orders);
          }
          setProgress(80);
          setTimeout(() => {
            setProgress(100);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchOrderData();
    if (!isLogin) {
      handleLoginClick();
    }
  }, [isLogin]);
  if (!isLogin) {
    return <h1 className="messagetouser">Please Login To See Orders</h1>;
  }
  if (orderDataLoading) {
    return <h1 className="messagetouser">Loading....</h1>;
  }
  if (!orderData.length) {
    return <h1 className="messagetouser">No Orders Yet</h1>;
  }

  return (
    <div>
      <div className="ordersHeading">
        <h1>My Orders</h1>
      </div>
      <section className="ordersCards">
        {orderData.map((order, index) => {
          return <OrderPrCard key={index} orderData={order} />;
        })}
      </section>
    </div>
  );
}

export default Orders;
