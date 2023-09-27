import { Link } from "react-router-dom";
import "../../CSS/home/SpeacialProduct.css";
import React, { useRef } from "react";

function SpeacialProduct({ data }) {
  console.log(data);
  const sliderRef = useRef(null);

  const handleSlideRight = () => {
    console.log(sliderRef.current.scrollLeft);
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
            {data.map((deal, index) => {
              const originalPrice = deal.price;

              const discountPercentage = Math.random() * (50 - 10) + 10;

              const discountAmount = Math.floor(
                (discountPercentage / 100) * originalPrice
              );

              return (
                <div className="top_deal_card" key={index}>
                  <img src={deal.images[0]} alt={deal.name} />
                  <h2>
                    <Link to={`/details/${deal._id}`} className="Pr_title">
                      {deal.name}
                    </Link>
                  </h2>
                  <div className="rating">
                    {Array.from({ length: deal.rating || 5 }, (_, idx) => (
                      <i key={idx} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <p className="market_price">{`$${
                    deal.price + discountAmount
                  }`}</p>
                  <p className="discount">{`Instant Rebate: ${discountAmount}`}</p>
                  <p className="now_price">{`Price : $${deal.price}`}</p>
                </div>
              );
            })}
          </section>
        </section>
      </section>
    </>
  );
}

export default SpeacialProduct;
