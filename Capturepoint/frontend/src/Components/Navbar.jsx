import React from "react";
import { Link } from "react-router-dom";
import "../CSS/navbar.css";
import logo from "../images/logo.png";

function Navbar() {
  return (
    <div>
      <Link></Link>
      <section id="header">
        <div className="daily_discount">
          <span> Enjoy </span>
          <b>5% OFF†</b>
          <span> purchases every day with the Adorama Edge Credit Card. </span>
          <Link to="/">LEARN MORE </Link>
        </div>

        <div id="nav__business">
          <div className="nav__business_item_left uppercase">
            <Link to="/">adorama business</Link>
            <Link to="/">adorama rentals</Link>
            <Link to="/">printque</Link>
            <Link to="/">our blog</Link>
          </div>
          <div className="nav__business_item_right">
            <Link to="/">
              <i className="fa-solid fa-phone"></i>
              800.223.2500
            </Link>

            <Link to="/">
              <i className="fa-sharp fa-solid fa-comment"></i>
              Live Chat
            </Link>
            <Link to="/">
              <i className="fa-solid fa-circle-info"></i>
              Help
              <i className="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
          </div>
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
              <span id="status">Sign in</span>
              <span id="username">
                MY Account <i className="fa-sharp fa-solid fa-angle-down"></i>
              </span>
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
