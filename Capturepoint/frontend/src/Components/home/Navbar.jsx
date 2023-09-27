import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/home/navbar.css";
import logo from "../../images/logo.png";
import Dropdown from "react-bootstrap/Dropdown";

import { useAuthContext } from "../../Context/LoginSignupContext"; // Replace with actual path
import ProgressBarComp from "../../helper/ProgressBar";

function Navbar() {
  const navigate = useNavigate();
  const searchElement1 = useRef();
  const searchElement2 = useRef();

  useEffect(() => {
    searchElement1.current.value = "";
    searchElement2.current.value = "";
  }, []);
  const {
    setLoginFalse,
    handleLoginClick,
    handleSignupClick,
    isLogin,
    loginUsername,
    setUsername,
  } = useAuthContext();
  const handleSearch = (value) => {
    if (value.trim()) navigate(`/search?q=${value}`);
  };
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
            <Link to={"/"}>
              <img src={logo} alt="CapturePoint" />
            </Link>
          </div>
          <div id="primary_content_right">
            <input
              ref={searchElement1}
              className="pcsearch serchbar"
              type="search"
              placeholder="Search"
            />
            <div
              onClick={() => handleSearch(searchElement1.current.value)}
              className="pcsearch"
              id="searchbar"
            >
              <i id="search_icon" className="fa-solid fa-magnifying-glass"></i>
            </div>

            <div id="signin_text">
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <i className="fa-solid userIcon fa-user"></i>
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

            <Link to="/cart">
              <div id="cart_icon">
                <span id="cart_quantity">5</span>
                <i className="bx bxs-shopping-bag"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="mobileSearchBar">
          {" "}
          <input
            ref={searchElement2}
            className="serchbar"
            type="search"
            placeholder="Search"
          />
          <div
            onClick={() => handleSearch(searchElement2.current.value)}
            id="searchbar"
          >
            <i id="search_icon" className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div id="nav_main">
          <div className="nav_main_left">
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                Product
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {}}>
                  <Link to="/search?c=Camera">Camera </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {}}>
                  <Link to="/search?c=Laptop">Laptop </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {}}>
                  <Link to="/search?c=Headphones">Headphone </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {}}>
                  <Link to="/search?c=Cases">Cpu Cases </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                Brands
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/search?b=Lenovo">Lenovo</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <Link to="/search?b=Sony">Sony</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <Link to="/search?b=Asus">Asus</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <Link to="/search?b=Acer">Acer</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <Link to="/search?b=Bose">Bose</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <Link to="/search?b=NZXT">NZXT</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <Link to="/search?b=Audio-Technica">Audio-Technica</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/">
              <span className="unusedLinks">Used</span>
            </Link>
            <Link to="/">
              <span className="unusedLinks">Deals</span>
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
