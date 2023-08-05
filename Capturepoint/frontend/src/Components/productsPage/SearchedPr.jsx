import React from "react";
import "../../CSS/productsPage/SearchedPr.css";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
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
  return (
    <>
      <section class="main">
        <h1 class="search_heading">Shop HP Products</h1>

        <div class="sort_box">
          <div class="sort_by_price">
            <select name="" id="sort_by_price_el">
              <option value="">Sort by Price</option>
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
          <div>
            <form>
              <input type="submit" value="Filter by price >" />
              <input id="min" required type="number" placeholder="*Min" />
              <input id="max" required type="number" placeholder="*Max" />
            </form>
          </div>
        </div>
      </section>
      <section className="card_box">
        {data.map((notebook, index) => (
          <div key={index}>
            <img src={notebook.image} alt={notebook.title} />
            <div className="rating">
              {[...Array(notebook.rating)].map((_, starIndex) => (
                <i key={starIndex} className="fa-solid fa-star"></i>
              ))}
            </div>
            <p>
              <Link className="a_link" href="#">
                {notebook.title}
              </Link>
            </p>
            <p>SKU: IPCZS80B MFR: DC-ZS80DK</p>
            <p>
              Final Price :<h4>{notebook.price}</h4>
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
  );
};

export default SearchedPr;
