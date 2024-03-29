import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Context/LoginSignupContext";
import { CartProvider } from "./Context/CartContext";
import { AlertProvider } from "./Context/AlertContext";
import { ProgressBarProvider } from "./Context/ProgressBarContext";
import { BrowserRouter } from "react-router-dom";
{
  /* <h1>Waheguru Ji</h1> */
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <CartProvider>
          <ProgressBarProvider>
            <App />
          </ProgressBarProvider>
        </CartProvider>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
