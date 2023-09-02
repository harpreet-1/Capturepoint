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
  const [spData, setSpData] = useState([]);
  const [nrData, setNrData] = useState([]);

  function fetchSpData(apiUrl) {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setSpData(data.products);
        });
    } catch (error) {
      console.log(error);
    }
  }
  function fetchNewReleaseData(apiUrl) {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNrData(data.products);
          setTimeout(() => {
            setProgress(80);
          }, 2000);
          setTimeout(() => {
            setProgress(100);
          }, 3000);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/products/search?sortField=price`;
    fetchSpData(apiUrl);
    setProgress(40);
    const apiUrl2 = `${process.env.REACT_APP_BASE_URL}/products/search?sortField=createdAt`;
    fetchNewReleaseData(apiUrl2);
  }, []);

  console.log("home");

  return (
    <div>
      <LoginModal />
      <SignUpModal />
      <Slideshow />
      <SpeacialProduct data={spData} />
      <NewReleased data={nrData} />
      <Promo />
      <Footer />
    </div>
  );
}

export default Home;
