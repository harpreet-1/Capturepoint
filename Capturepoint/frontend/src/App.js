import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/home/Navbar";
import SearchedPr from "./Components/productsPage/SearchedPr";
import PrDeatail from "./Pages/Pr_deatail";

function App() {
  return (
    <>
      <div className="App">
        {/* <h1>Waheguru Ji</h1> */}

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Products" element={<SearchedPr />} />
            <Route path="/details" element={<PrDeatail />} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
