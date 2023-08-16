import React, { useRef } from "react";
import "../../CSS/home/NewReleased.css";
import { Link } from "react-router-dom";

function NewReleased({ data }) {
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
      <section id="new_releases">
        <section>
          <h3>NEW RELEASES</h3>
        </section>
        <section className="pr_slider">
          <div className="l_btn" onClick={handleSlideLeft}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="r_btn" onClick={handleSlideRight}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <section id="new_release_cards" ref={sliderRef}>
            {data?.map((item) => (
              <div key={item._id} className="pr_card">
                <div className="card_image">
                  <img src={item.images[0]} alt={"item.title"} />
                </div>
                <div className="rating">
                  {[...Array(item.rating || 5)].map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <h3>
                  <Link className="new_pr_title" to={`/details/${item._id}`}>
                    {item.name}
                  </Link>
                </h3>
                <p className="new_release_price">{`$${item.price}`}</p>
                <p className="new_release_des">
                  {`${item.description.slice(0, 38)}...`}
                </p>
              </div>
            ))}
          </section>
        </section>
      </section>
    </>
  );
}

export default NewReleased;
