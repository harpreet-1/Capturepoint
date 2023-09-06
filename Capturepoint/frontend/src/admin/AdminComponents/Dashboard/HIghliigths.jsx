import React, { useEffect, useState } from "react";
import { useProgressBarContext } from "../../../Context/ProgressBarContext";

function Highliigths() {
  const { setProgress } = useProgressBarContext();
  const [highlihtsData, setHighlihtsData] = useState({
    userCount: 1100,
    totalCount: 562,
    totalAmount: 14000,
  });
  const token = localStorage.getItem("token");
  function fetchtHighlihtsData() {
    try {
      setProgress(20);
      fetch(`${process.env.REACT_APP_BASE_URL}/admin/highlights`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Invalid token.") {
            // return handleLoginClick();
          }
          if (data.status) {
            setHighlihtsData(data);
          }
          setProgress(88);
          setTimeout(() => {
            setProgress(100);
          }, 2000);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchtHighlihtsData();
  }, []);
  return (
    <ul className="box-info">
      <li>
        <i className="bx bxs-group"></i>
        <span className="text">
          <h3>{highlihtsData.userCount}</h3>
          <p>Custmores</p>
        </span>
      </li>
      <li>
        <i className="bx bxs-calendar-check"></i>
        <span className="text">
          <h3>{highlihtsData.totalCount}</h3>
          <p>Orders</p>
        </span>
      </li>
      <li>
        <i className="bx bxs-dollar-circle"></i>
        <span className="text">
          <h3>${highlihtsData.totalAmount}</h3>
          <p>Total Sales</p>
        </span>
      </li>
    </ul>
  );
}

export default Highliigths;
