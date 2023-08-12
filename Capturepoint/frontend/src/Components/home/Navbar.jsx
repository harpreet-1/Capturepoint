import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/home/navbar.css";
import logo from "../../images/logo.png";
import Dropdown from "react-bootstrap/Dropdown";

import { useAuthContext } from "../../Context/LoginSignupContext"; // Replace with actual path

function Navbar() {
  const {
    setLoginFalse,
    handleLoginClick,
    handleSignupClick,
    isLogin,
    loginUsername,
    setUsername,
  } = useAuthContext();

  return (
    <div>
      <section id="header">
        <div className="daily_discount">
          <span> Enjoy </span>
          <b>5% OFF†</b>
          <span>
            {" "}
            purchases every day with the CapturePoint Edge Credit Card.{" "}
          </span>
        </div>

        <div id="primary_content">
          <div id="logo">
            <img src={logo} alt="CapturePoint" />
          </div>
          <div id="primary_content_right">
            <input className="serchbar" type="text" placeholder="Search" />
            <div id="searchbar">
              <i id="search_icon" className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div id="user_icon">
              <i className="fa-solid fa-user"></i>
            </div>

            <div id="signin_text">
              {/* <span id="status">Sign in</span>
              <span id="username">
                MY Account <i className="fa-sharp fa-solid fa-angle-down"></i>
              </span> */}

              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  {loginUsername}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {!isLogin && (
                    <Dropdown.Item
                      onClick={() => {
                        handleLoginClick();
                      }}
                    >
                      Login
                    </Dropdown.Item>
                  )}
                  {!isLogin && (
                    <Dropdown.Item onClick={handleSignupClick}>
                      Signup
                    </Dropdown.Item>
                  )}
                  {isLogin && (
                    <Dropdown.Item
                      onClick={() => {
                        setUsername("Guest");
                        localStorage.clear();
                        setLoginFalse();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Link to="/cart.html">
              <div id="cart_icon">
                <span id="cart_quantity">0</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </Link>
          </div>
        </div>
        <div id="nav_main">
          <div className="nav_main_left">
            <Link to="/">
              Product<i className="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
            <Link to="/">
              Brands<i className="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
            <Link to="/">
              Used<i className="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
            <Link to="/">
              deals<i className="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
          </div>
          <div className="nav_main_right">
            <Link to="/">Deal of the Day</Link>
            <Link to="/">CapturePoint Credit Card</Link>
            <Link to="/">Vip rewards</Link>
            <Link to="/">Gift Card</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
