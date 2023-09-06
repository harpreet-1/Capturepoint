import React, { useEffect, useState } from "react";
import AdminPrCard from "./AdminPrCard";
import ReactLoading from "react-loading";
import { useProgressBarContext } from "../../../Context/ProgressBarContext";

function AdminPrCards() {
  console.log("ssss");
  const { setProgress } = useProgressBarContext();
  const [adminProductData, setAdminProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  function fetchAdminProduct() {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/admin/products`;

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
            setAdminProductData(data.products);
          }
          setProgress((prev) => Math.max(prev, 88));
          setTimeout(() => {
            setProgress(0);
            setIsLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAdminProduct();
  }, []);

  return !isLoading ? (
    adminProductData.map((product) => {
      return <AdminPrCard product={product} key={Math.random()} />;
    })
  ) : (
    <div className="react-loading">
      <ReactLoading type={"spokes"} color={"Black"} height={50} width={50} />
    </div>
  );
}

export default AdminPrCards;
