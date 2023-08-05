import React from "react";
import Slideshow from "../Components/home/Slideshow";
import SpeacialProduct from "../Components/home/SpeacialProduct";
import NewReleased from "../Components/home/NewReleased";
import Promo from "../Components/home/Promo";
import Footer from "../Components/home/Footer";

function Home() {
  return (
    <div>
      <Slideshow />
      <SpeacialProduct />
      <NewReleased />
      <Promo />
      <Footer />
    </div>
  );
}

export default Home;
