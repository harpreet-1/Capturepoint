import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/home/Navbar";
import SearchedPr from "./Components/productsPage/SearchedPr";
import PrDeatail from "./Pages/Pr_deatail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Islogin from "./helper/Islogin";
import LoginModal from "./Components/LoginModal";
import SignUpModal from "./Components/SignupModal";
import Orders from "./Pages/Orders";
import AlertModel from "./Components/modals/AlertModal";
import OrderConfirm from "./Pages/OrderConfirm";
import AdminRoutes from "./admin/AdminRoutes";
import ProgressBarComp from "./helper/ProgressBar";

function App() {
  Islogin();
  console.log("appp render*************");

  const showNavbarAndModals = !window.location.pathname.startsWith("/admin");
  return (
    <>
      <div className="App">
        {showNavbarAndModals && <Navbar />}
        {showNavbarAndModals && <LoginModal />}
        {showNavbarAndModals && <SignUpModal />}

        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/search" element={<SearchedPr />} />
          <Route path="/details/:prId" element={<PrDeatail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orderConfirm" element={<OrderConfirm />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <AlertModel />
        <ProgressBarComp />
      </div>
    </>
  );
}

export default App;
