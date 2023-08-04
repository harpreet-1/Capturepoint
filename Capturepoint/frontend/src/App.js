import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      {/* <h1>Waheguru Ji</h1> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
