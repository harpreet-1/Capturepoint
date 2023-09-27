import React, { useEffect, useState } from "react";
import Slideshow from "../Components/home/Slideshow";
import SpeacialProduct from "../Components/home/SpeacialProduct";
import NewReleased from "../Components/home/NewReleased";
import Promo from "../Components/home/Promo";
import Footer from "../Components/home/Footer";
import LoginModal from "../Components/LoginModal";
import SignUpModal from "../Components/SignupModal";
import "../CSS/Login.css";
import { useProgressBarContext } from "../Context/ProgressBarContext";

function Home() {
  const { setProgress } = useProgressBarContext();
  const [spData, setSpData] = useState(null);

  function fetchSpData(apiUrl) {
    try {
      setProgress(20);
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setSpData(data.products);
          setProgress(100);
          setTimeout(() => {
            setProgress(0);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/products/search?sort=-price&page=1`;
    fetchSpData(apiUrl);
  }, []);

  return (
    <div>
      <LoginModal />
      <SignUpModal />
      <Slideshow />
      {spData && <SpeacialProduct data={spData} />}
      <NewReleased />
      <Promo />
      <Footer />
    </div>
  );
}

export default Home;
