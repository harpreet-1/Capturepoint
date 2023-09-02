import React from "react";
import { Link } from "react-router-dom";
import { useAdminSidebarCotext } from "../../Context/AdminSidebarCotext";

function AdminNavbar() {
  const { setSidebarVisible } = useAdminSidebarCotext();
  const handleMenuBarClick = () => {
    setSidebarVisible((prev) => !prev);
  };
  return (
    <nav>
      <i className="bx bx-menu" onClick={handleMenuBarClick}></i>
      <Link to="/" className="nav-link">
        Categories
      </Link>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <Link to="/" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">8</span>
      </Link>
      <Link to="/" className="profile">
        <img src="img/people.png" />
      </Link>
    </nav>
  );
}

export default AdminNavbar;
