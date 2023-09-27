import React, { useEffect, useState } from "react";
import "../CSS/Orders/order.css";
import ReactLoading from "react-loading";
import OrderPrCard from "../Components/Order/OrderPrCard";
import { useAuthContext } from "../Context/LoginSignupContext";
import { useProgressBarContext } from "../Context/ProgressBarContext";
import OrderCancleConfirmModal from "../Components/modals/OrderCancleConfirmModal";
import ProgressBarComp from "../helper/ProgressBar";

function Orders() {
  const { setProgress } = useProgressBarContext();

  const { handleLoginClick, isLogin } = useAuthContext();

  const [orderData, setOrderData] = useState([]);
  const [orderDataLoading, setOrderDataLoading] = useState(true);
  const token = localStorage.getItem("token") || null;

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
          console.log(data);
          if (data.message === "Invalid token.") {
            return handleLoginClick();
          }
          if (data.success) {
            setOrderData(data.orders);
          }
          setProgress(88);
          setTimeout(() => {
            setProgress(0);
            setOrderDataLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!isLogin) {
      return handleLoginClick();
    }

    fetchOrderData();
  }, [isLogin]);
  if (!isLogin) {
    return <h1 className="messagetouser">Please Login To See Orders</h1>;
  }

  if (!orderDataLoading && !orderData.length) {
    return <h1 className="messagetouser">No Orders Yet</h1>;
  }

  return (
    <>
      {!orderDataLoading ? (
        <div>
          <div className="ordersHeading">
            <h1>My Orders</h1>
          </div>
          <section className="ordersCards">
            {orderData.map((order, index) => {
              return <OrderPrCard key={order._id} orderData={order} />;
            })}
          </section>
        </div>
      ) : (
        <div className="react-loading">
          <ReactLoading
            type={"spokes"}
            color={"Black"}
            height={50}
            width={50}
          />
        </div>
      )}
    </>
  );
}

export default Orders;
