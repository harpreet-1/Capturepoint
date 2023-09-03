import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminSidebarCotext } from "../../Context/AdminSidebarCotext";

function SideBar() {
  const { sidebarVisible } = useAdminSidebarCotext();
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const sideMenuItems = [
    { icon: "bxs-dashboard", text: "Dashboard", to: "/admin" },
    { icon: "bxs-shopping-bag-alt", text: "Products", to: "/admin/products" },
    { icon: "bxs-doughnut-chart", text: "Orders", to: "/admin/orders" },
    { icon: "bxs-message-dots", text: "Custmores", to: "/admin/custmores" },
    { icon: "bxs-group", text: "Team", to: "/admin" },
  ];

  return (
    <section id="sidebar" className={sidebarVisible ? "" : "hide"}>
      <Link to="/dashboard" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">CapturePoint</span>
      </Link>
      <ul className="side-menu top">
        {sideMenuItems.map((item, index) => (
          <li
            key={index}
            className={index === activeMenuItem ? "active" : ""}
            onClick={() => handleMenuItemClick(index)}
          >
            <Link to={item.to}>
              <i className={`bx ${item.icon}`}></i>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <Link to="/admin">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <Link className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
