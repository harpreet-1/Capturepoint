import React, { useEffect, useState } from "react";

function Left({ data }) {
  // Image URLs
  useEffect(() => {
    setMainImg(data.images[0]);
  }, [data]);

  const [mainImg, setMainImg] = useState(data?.images[0]);
  const handleImageClick = (imageUrl) => {
    setMainImg(imageUrl);
  };
  // mainImg !== smallImages[0] ? setMainImg[smallImages[0]] : "";

  const smallImages = [
    data.images[0],
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
