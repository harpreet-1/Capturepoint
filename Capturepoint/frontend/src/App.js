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

function App() {
  Islogin();
  console.log("appp render*************");
  return (
    <>
      <div className="App">
        {/* <h1>Waheguru Ji</h1> */}
        {/* <Alert variant={"primary"}>This is a alert—check it out!</Alert> */}
        <BrowserRouter>
          <Navbar />
          <LoginModal />
          <SignUpModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<SearchedPr />} />
            <Route path="/details/:prId" element={<PrDeatail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <AlertModel />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
