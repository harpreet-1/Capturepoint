import React, { useEffect, useState } from "react";
import OrderPrCard from "../../../Components/Order/OrderPrCard";

function RecentOrder({ allData }) {
  const [recentOrderData, setRecentOrderData] = useState([]);
  const token = localStorage.getItem("token");
  function fetchRecentOrder() {
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
            setRecentOrderData(data.orders);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchRecentOrder();
  }, []);
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Recent Orders</h3>
          <i className="bx bx-search"></i>
          <i className="bx bx-filter"></i>
        </div>
        {/* <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date Order</th>
              <th>Adress</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody> */}
        {recentOrderData.map((order, index) => {
          const { orderDate, orderStatus, orderTotal, shippingAddress } = order;
          const { streetAddress, floor, city, state, pincode } =
            shippingAddress;
          const address = ` ${city} ,  ${state} , ${pincode}`;
          return <OrderPrCard order={order} key={Math.random()} />;
        })}
        {/* </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default RecentOrder;
