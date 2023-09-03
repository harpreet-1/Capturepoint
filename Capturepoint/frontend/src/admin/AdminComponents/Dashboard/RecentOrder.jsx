import React, { useEffect, useState } from "react";
import OrderPrCard from "../../../Components/Order/OrderPrCard";

function RecentOrder({ allData }) {
  console.log("recent order");
  const [adminOrderData, setAdminOrderData] = useState([]);
  const token = localStorage.getItem("token");
  function fetchAdminOrder() {
    try {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/orders${
          !allData ? "?limit=5" : ""
        }`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data from recent******************");
          console.log(data);
          if (data.message === "Invalid token.") {
            // return handleLoginClick();
          }
          if (data.success) {
            setAdminOrderData(data.orders);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAdminOrder();
  }, []);
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">{!allData && <h3>Recent Orders</h3>}</div>
        {adminOrderData.map((order) => {
          return <OrderPrCard orderData={order} key={Math.random()} />;
        })}
      </div>
    </div>
  );
}

export default RecentOrder;
