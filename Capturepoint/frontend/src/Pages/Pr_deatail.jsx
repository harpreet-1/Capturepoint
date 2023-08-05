import React from "react";
import "../CSS/Pr_deatail/pr_deatails.css";
import Left from "../Components/pr_deatils/Left";
import Right from "../Components/pr_deatils/Right";
import SpeacialProduct from "../Components/home/SpeacialProduct";
import NewReleased from "../Components/home/NewReleased";
import Footer from "../Components/home/Footer";

function PrDeatail() {
  return (
    <>
      <section className="main">
        <Left />
        <Right />
      </section>{" "}
      <NewReleased />
      <Footer />
    </>
  );
}

export default PrDeatail;
