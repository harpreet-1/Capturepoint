import React, { useEffect, useState } from "react";
import "../CSS/Pr_deatail/pr_deatails.css";
import Left from "../Components/pr_deatils/Left";
import Right from "../Components/pr_deatils/Right";
import NewReleased from "../Components/home/NewReleased";
import Footer from "../Components/home/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Context/LoginSignupContext";
import { useAlertContext } from "../Context/AlertContext";
import { useProgressBarContext } from "../Context/ProgressBarContext";
import LoginModal from "../Components/LoginModal";
function PrDeatail() {
  const { setProgress } = useProgressBarContext();
  const navigate = useNavigate();
  const { showAlert } = useAlertContext();
  const { isLogin } = useAuthContext();

  const [prUpdated, setPrUpdated] = useState(false);
  const [prDetail, setPrDetail] = useState(null);
  let { prId } = useParams();

  function fetchPrDetails(url) {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.status) {
            showAlert("Something went Wrong !", "danger", 1000);
            setTimeout(() => {
              navigate("/");
            }, 2000);
            return;
          }
          setPrDetail(data.products);
          setProgress((prev) => Math.max(prev, 100));
          setTimeout(() => {
            setProgress(0);
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setProgress(20);
  }, [prId]);

  useEffect(() => {
    const PrDeatailApi = `${process.env.REACT_APP_BASE_URL}/products/byid/${prId}`;
    fetchPrDetails(PrDeatailApi);
  }, [prUpdated, isLogin, prId]);
  return (
    prDetail && (
      <>
        {
          <section className="details_main">
            <Left data={prDetail} />
            <Right
              isLogin={isLogin}
              prUpdated={prUpdated}
              setPrUpdated={setPrUpdated}
              data={prDetail}
            />
          </section>
        }
        <NewReleased />
        <Footer />
      </>
    )
  );
}

export default PrDeatail;
