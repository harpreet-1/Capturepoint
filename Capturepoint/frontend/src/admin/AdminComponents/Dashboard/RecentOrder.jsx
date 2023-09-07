import React, { useEffect, useState } from "react";
import OrderPrCard from "../../../Components/Order/OrderPrCard";
import ReactLoading from "react-loading";
import { useProgressBarContext } from "../../../Context/ProgressBarContext";

function RecentOrder({ allData }) {
  const { setProgress } = useProgressBarContext();

  const [adminOrderData, setAdminOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  function fetchAdminOrder() {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/admin/orders${
        !allData ? "?limit=5" : ""
      }`;
      console.log(url);
      setProgress((prev) => Math.max(prev, 20));
      fetch(url, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Invalid token.") {
            // return handleLoginClick();
          }
          if (data.success) {
            setAdminOrderData(data.orders);
          }
          setProgress((prev) => Math.max(prev, 88));
          setTimeout(() => {
            setProgress(0);
          }, 1000);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAdminOrder();
  }, []);
  return !isLoading ? (
    <div className="table-data">
      <div className="order">
        <div className="head">{!allData && <h3>Recent Orders</h3>}</div>
        {adminOrderData.map((order) => {
          return <OrderPrCard orderData={order} key={Math.random()} />;
        })}
      </div>
    </div>
  ) : (
    <div className="react-loading">
      <ReactLoading type={"spokes"} color={"Black"} height={50} width={50} />
    </div>
  );
}

export default RecentOrder;
