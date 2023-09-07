import React, { useEffect, useState } from "react";
import AdminPrCard from "./AdminPrCard";
import ReactLoading from "react-loading";
import { useProgressBarContext } from "../../../Context/ProgressBarContext";
import AddProduct from "./Addproduct";

import FilterSortComponent from "../../../Components/productsPage/ProductFilters";

function AdminPrCards() {
  const [sortState, setSortState] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    sort: null,
  });

  const { setProgress } = useProgressBarContext();
  const [adminProductData, setAdminProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  function fetchAdminProduct() {
    try {
      setProgress((prev) => Math.max(prev, 20));
      let url = `${process.env.REACT_APP_BASE_URL}/admin/products${
        sortState ? `?sort=${sortState}` : ""
      }`;

      fetch(url, {
        method: "GET",
        headers: {
          "auth-token": token,
          "pr-filters": JSON.stringify(filters),
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
  }, [filters]);

  return !isLoading ? (
    <>
      <AddProduct setAdminProductData={setAdminProductData} />
      <FilterSortComponent
        sortState={sortState}
        setSortState={setSortState}
        filters={filters}
        setFilters={setFilters}
      />

      {adminProductData.length ? (
        adminProductData.map((product) => {
          return <AdminPrCard product={product} key={Math.random()} />;
        })
      ) : (
        <h1 className="react-loading">No Product Found</h1>
      )}
    </>
  ) : (
    <div className="react-loading">
      <ReactLoading type={"spokes"} color={"Black"} height={50} width={50} />
    </div>
  );
}

export default AdminPrCards;
