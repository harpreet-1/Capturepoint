import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/home/Navbar";
import SearchedPr from "./Components/productsPage/SearchedPr";
import PrDeatail from "./Pages/Pr_deatail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
function App() {
  console.log("app render");
  return (
    <>
      <div className="App">
        {/* <h1>Waheguru Ji</h1> */}

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<SearchedPr />} />
            <Route path="/details" element={<PrDeatail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
