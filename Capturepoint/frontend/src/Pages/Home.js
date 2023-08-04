import React from "react";
import Navbar from "../Components/Navbar";
import Slideshow from "../Components/Slideshow";
import SpeacialProduct from "../Components/SpeacialProduct";

function Home() {
  return (
    <div>
      <Slideshow />
      <SpeacialProduct />
    </div>
  );
}

export default Home;
