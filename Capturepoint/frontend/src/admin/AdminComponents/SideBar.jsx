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
    { icon: "bxs-dashboard", text: "Dashboard" },
    { icon: "bxs-shopping-bag-alt", text: "My Store" },
    { icon: "bxs-doughnut-chart", text: "Analytics" },
    { icon: "bxs-message-dots", text: "Message" },
    { icon: "bxs-group", text: "Team" },
  ];

  return (
    <section id="sidebar" className={sidebarVisible ? "" : "hide"}>
      <Link to="/dashboard" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">AdminHub</span>
      </Link>
      <ul className="side-menu top">
        {sideMenuItems.map((item, index) => (
          <li
            key={index}
            className={index === activeMenuItem ? "active" : ""}
            onClick={() => handleMenuItemClick(index)}
          >
            <Link to="/dashboard">
              <i className={`bx ${item.icon}`}></i>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <Link to="/dashboard">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
