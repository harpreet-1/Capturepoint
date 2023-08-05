import React, { useState } from "react";

function Left() {
  // Image URLs

  const [mainImg, setMainImg] = useState(
    "https://www.adorama.com/images/Large/gphero10hb.jpg"
  );
  const handleImageClick = (imageUrl) => {
    setMainImg(imageUrl);
  };
  const smallImages = [
    "https://www.adorama.com/images/Large/gphero10hb.jpg",
    "https://www.adorama.com/images/Large/gphero10hb_1.jpg",
    "https://www.adorama.com/images/Large/gphero10hb_2.jpg",
    "https://www.adorama.com/images/Large/gphero10hb_3.jpg",
    "https://www.adorama.com/images/Large/gphero10hb_4.jpg",
  ];

  return (
    <div className="left">
      <div className="wish_list">
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="left_inner">
        <div className="main_pic">
          <img className="big_img" src={mainImg} alt="" />
        </div>
        <div className="sub_pics">
          {smallImages.map((image, index) => (
            <div key={index}>
              <img
                className="small_img"
                src={image}
                alt=""
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Left;
