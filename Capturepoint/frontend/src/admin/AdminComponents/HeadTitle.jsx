import React from "react";
import { Link } from "react-router-dom";

function HeadTitle() {
  return (
    <div className="head-title">
      <div className="head-title-left">
        <h1>Dashboard</h1>
        <ul className="breadcrumb">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <i className="bx bx-chevron-right"></i>
          </li>
          <li>
            <Link className="active" href="#">
              Home
            </Link>
          </li>
        </ul>
      </div>
      <Link to="/" className="btn-download">
        <i className="bx bxs-cloud-download"></i>
        <span className="text">Download PDF</span>
      </Link>
    </div>
  );
}

export default HeadTitle;
