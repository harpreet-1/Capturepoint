import React from "react";
import { Link } from "react-router-dom";
import "../CSS/navbar.css";
import logo from "../images/logo.png";

function Navbar() {
  return (
    <div>
      <Link></Link>
      <section id="header">
        <div class="daily_discount">
          <span> Enjoy </span>
          <b>5% OFF†</b>
          <span> purchases every day with the Adorama Edge Credit Card. </span>
          <Link to="/">LEARN MORE </Link>
        </div>

        <div id="nav__business">
          <div class="nav__business_item_left uppercase">
            <Link to="/">adorama business</Link>
            <Link to="/">adorama rentals</Link>
            <Link to="/">printque</Link>
            <Link to="/">our blog</Link>
          </div>
          <div class="nav__business_item_right">
            <Link to="/">
              <i class="fa-solid fa-phone"></i>
              800.223.2500
            </Link>

            <Link to="/">
              <i class="fa-sharp fa-solid fa-comment"></i>
              Live Chat
            </Link>
            <Link to="/">
              <i class="fa-solid fa-circle-info"></i>
              Help
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
          </div>
        </div>
        <div id="primary_content">
          <div id="logo">
            <img src={logo} alt="CapturePoint" />
          </div>
          <div id="primary_content_right">
            <input class="serchbar" type="text" placeholder="Search" />
            <div id="searchbar">
              <i id="search_icon" class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div id="user_icon">
              <i class="fa-solid fa-user"></i>
            </div>

            <div id="signin_text">
              <span id="status">Sign in</span>
              <span id="username">
                MY Account <i class="fa-sharp fa-solid fa-angle-down"></i>
              </span>
            </div>

            <Link to="/cart.html">
              <div id="cart_icon">
                <span id="cart_quantity">0</span>
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
            </Link>
          </div>
        </div>
        <div id="nav_main">
          <div class="nav_main_left">
            <Link to="/">
              Product<i class="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
            <Link to="/">
              Brands<i class="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
            <Link to="/">
              Used<i class="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
            <Link to="/">
              deals<i class="fa-sharp fa-solid fa-angle-down"></i>
            </Link>
          </div>
          <div class="nav_main_right">
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
