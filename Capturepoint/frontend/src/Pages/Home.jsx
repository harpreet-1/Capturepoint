import React from "react";
import Slideshow from "../Components/home/Slideshow";
import SpeacialProduct from "../Components/home/SpeacialProduct";
import NewReleased from "../Components/home/NewReleased";
import Promo from "../Components/home/Promo";
import Footer from "../Components/home/Footer";
import LoginModal from "../Components/LoginModal";
import SignUpModal from "../Components/SignupModal";
import "../CSS/Login.css";

function Home() {
  return (
    <div>
      <LoginModal />
      <SignUpModal />
      <Slideshow />
      <SpeacialProduct />
      <NewReleased />
      <Promo />
      <Footer />
    </div>
  );
}

export default Home;
