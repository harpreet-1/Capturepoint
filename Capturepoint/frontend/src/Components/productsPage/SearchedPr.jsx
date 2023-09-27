import React, { useEffect, useState } from "react";
import "../../CSS/productsPage/SearchedPr.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Footer from "../home/Footer";
import ProductFilters from "./ProductFilters";
import ReactLoading from "react-loading";
import { useProgressBarContext } from "../../Context/ProgressBarContext";
const data = [
  {
    image: "https://www.adorama.com/images/Large/ifjxt5s.jpg",
    title: "Fujifilm X-T5 Mirrorless Digital Camera Body, Silver",
    price: "1699.95",
    id: "1",
    des: "TOP RATED GEAR",
    rating: 5,
  },
  {
    image: "https://www.adorama.com/images/Large/ifjxt5s.jpg",
    title: "Fujifilm X-T5 Mirrorless Digital Camera Body, Silver",
    price: "1699.95",
    id: "1",
    des: "TOP RATED GEAR",
    rating: 5,
  },
  {
    image: "https://www.adorama.com/images/Large/ifjxt5s.jpg",
    title: "Fujifilm X-T5 Mirrorless Digital Camera Body, Silver",
    price: "1699.95",
    id: "1",
    des: "TOP RATED GEAR",
    rating: 5,
  },
  {
    image: "https://www.adorama.com/images/Large/ifjxt5s.jpg",
    title: "Fujifilm X-T5 Mirrorless Digital Camera Body, Silver",
    price: "1699.95",
    id: "1",
    des: "TOP RATED GEAR",
    rating: 5,
  },
  {
    image: "https://www.adorama.com/images/Large/ifjxt5s.jpg",
    title: "Fujifilm X-T5 Mirrorless Digital Camera Body, Silver",
    price: "1699.95",
    id: "1",
    des: "TOP RATED GEAR",
    rating: 5,
  },
  // Add more data objects as needed
];
const SearchedPr = () => {
  const params = window.location.search.slice(1).split("=");

  console.log(params);
  const token = localStorage.getItem("token");
  const [sortState, setSortState] = useState(null);

  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    sort: null,
  });

  const { setProgress } = useProgressBarContext();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  function fetchProduct() {
    try {
      setProgress((prev) => Math.max(prev, 20));
      let url = `${process.env.REACT_APP_BASE_URL}/products/search${
        sortState ? `?sort=${sortState}` : ""
      }`;

      fetch(url, {
        method: "GET",
        headers: {
          "pr-filters": JSON.stringify(filters),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.success) {
            setProductData(data.products);
          }
          setProgress((prev) => Math.max(prev, 100));
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
    fetchProduct();
  }, [filters]);
  useEffect(() => {
    console.log("change");
    if (params[0] === "b") {
      setFilters({
        brand: [params[1]],
        sort: null,
        category: [],
      });
    }
    if (params[0] === "c") {
      setFilters({ brand: [], sort: null, category: [params[1]] });
    }

    if (params[0] === "q") {
      setFilters({ brand: [], sort: null, category: [], search: params[1] });
    }
  }, [window.location.search]);

  if (isLoading) {
    return (
      <div className="react-loading">
        <ReactLoading
          type={"spokes"}
          color={"Black"}
          height={"100vh"}
          width={50}
        />
      </div>
    );
  } else if (productData && productData.length == 0) {
    return (
      <div className="react-loading">
        <h2>No product for "{params[1]}"</h2>
      </div>
    );
  }
  return (
    productData &&
    productData.length && (
      <>
        <section className="searched_main">
          <h1 className="search_heading">
            Search Results for “{params[1]}”( {productData.length} )
          </h1>

          <ProductFilters
            sortState={sortState}
            setSortState={setSortState}
            filters={filters}
            setFilters={setFilters}
          />
        </section>
        <section className="card_box">
          {productData.map((product, index) => (
            <div key={index}>
              <img src={product.images[0]} alt={product.name} />
              <div className="rating">
                {[...Array(5)].map((_, starIndex) => (
                  <i key={starIndex} className="fa-solid fa-star"></i>
                ))}
              </div>
              <p>
                <Link className="a_link" to={`/details/${product._id}`}>
                  {product.name}
                </Link>
              </p>

              <p>
                Price : <b> ${product.price}</b>
              </p>
              <p>
                <span>$67/mo</span>
                <span>suggested payments with 6‑month special financing.</span>
                <Link className="a_link">Learn how.</Link>
              </p>
              <p>In Stock</p>
            </div>
          ))}
        </section>
        <Footer />
      </>
    )
  );
};

export default SearchedPr;
