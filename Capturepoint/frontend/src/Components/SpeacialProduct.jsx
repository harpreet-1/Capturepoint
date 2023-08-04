import { Link } from "react-router-dom";
import "../CSS/SpeacialProduct.css";
import React, { useRef, useState } from "react";

function SpeacialProduct() {
  const topDeals = [
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    {
      imgSrc: "https://www.adorama.com/images/product/ifjxt4s.jpg",
      title: "Fujifilm X-T4 Mirrorless Digital Camera Body, Silver",
      rating: 5,
      marketPrice: "$1699.00",
      discount: "Instant Rebate: $150.00",
      nowPrice: "Price : $1549.00",
    },
    // Add other product objects here...
  ];

  const sliderRef = useRef(null);

  const handleSlideRight = () => {
    sliderRef.current.scrollLeft += sliderRef.current.clientWidth * 0.5;
  };

  const handleSlideLeft = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.clientWidth * 0.5;
  };

  return (
    <>
      <section id="top_deals">
        <section id="top_deals_head">
          <i className="fa-solid fa-trophy"></i>
          <h1 className="uppercase">Our Top deals</h1>
        </section>
        <section className="pr_slider">
          <div className="l_btn" onClick={handleSlideLeft}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="r_btn" onClick={handleSlideRight}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <section id="top_deal_cards" ref={sliderRef}>
            {topDeals.map((deal, index) => (
              <div className="top_deal_card" key={index}>
                <img src={deal.imgSrc} alt="" />
                <h2>
                  <Link to="" className="Pr_title">
                    {deal.title}
                  </Link>
                </h2>
                <div className="rating">
                  {Array.from({ length: deal.rating }, (_, idx) => (
                    <i key={idx} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="market_price">{deal.marketPrice}</p>
                <p className="discount">{deal.discount}</p>
                <p className="now_price">{deal.nowPrice}</p>
              </div>
            ))}
          </section>
        </section>
      </section>
    </>
  );
}

export default SpeacialProduct;
