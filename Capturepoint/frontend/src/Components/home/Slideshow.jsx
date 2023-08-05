import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

const imageUrls = [
  "https://www.adorama.com/images/cms/36471Hero-New-Year-New-You-Desktop@2x_02759.jpg",
  "https://www.adorama.com/images/cms/36471New-MacBook-Pro-2023-Hero-Desktop@1.5x_87161.jpg",
  "https://www.adorama.com/images/cms/36471Hero-New-Year-New-You-Desktop@2x_02759.jpg",
  "https://www.adorama.com/images/cms/36471New-MacBook-Pro-2023-Hero-Desktop@1.5x_87161.jpg",
  "https://www.adorama.com/images/cms/36471Hero-New-Year-New-You-Desktop@2x_02759.jpg",
  "https://www.adorama.com/images/cms/36471New-MacBook-Pro-2023-Hero-Desktop@1.5x_87161.jpg",
];

function Slideshow() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Carousel>
      {imageUrls.map((imageUrl, index) => (
        <Carousel.Item key={index} interval={1000}>
          <img
            className="d-block w-100"
            src={imageUrl}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slideshow;
