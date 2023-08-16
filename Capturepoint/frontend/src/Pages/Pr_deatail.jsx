import React, { useEffect, useState } from "react";
import "../CSS/Pr_deatail/pr_deatails.css";
import Left from "../Components/pr_deatils/Left";
import Right from "../Components/pr_deatils/Right";
import NewReleased from "../Components/home/NewReleased";
import Footer from "../Components/home/Footer";
import { useParams } from "react-router-dom";
function PrDeatail() {
  const [nrData, setNrData] = useState([]);
  const [prDetail, setPrDetail] = useState(null);
  let { prId } = useParams();

  function fetchPrDetails(url) {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPrDetail(data);
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
          setNrData(data.products);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/products/search?sortField=createdAt`;
    fetchNewReleaseData(apiUrl);
    const PrDeatailApi = `${process.env.REACT_APP_BASE_URL}/products/byid/${prId}`;
    fetchPrDetails(PrDeatailApi);

    window.scrollTo({ top: 0 });
  }, [prId]);
  return (
    <>
      {prDetail && (
        <section className="details_main">
          <Left data={prDetail} />
          <Right data={prDetail} />
        </section>
      )}
      <NewReleased data={nrData} />
      <Footer />
    </>
  );
}

export default PrDeatail;
