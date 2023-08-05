import React from "react";
import "../../CSS/home/NewReleased.css";
import { Link } from "react-router-dom";
const newReleasedData = [
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

function NewReleased() {
  return (
    <>
      <section id="new_releases">
        <section>
          <h3>NEW RELEASES</h3>
        </section>
        <section id="new_release_cards">
          {newReleasedData.map((item) => (
            <div key={item.id} className="pr_card">
              <img src={item.image} alt={item.title} />
              <div className="rating">
                {[...Array(item.rating)].map((_, index) => (
                  <i key={index} className="fa-solid fa-star"></i>
                ))}
              </div>
              <h3>
                <Link className="new_pr_title" to={item.title}>
                  {item.title}
                </Link>
              </h3>
              <p className="new_release_price">{item.price}</p>
              <p className="new_release_des">{item.des}</p>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}

export default NewReleased;
