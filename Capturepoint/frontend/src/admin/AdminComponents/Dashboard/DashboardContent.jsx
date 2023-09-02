import React from "react";
import AdminNavbar from "../AdminNavbar";
import { Link } from "react-router-dom";
import Highliigths from "./HIghliigths";
import HeadTitle from "../HeadTitle";
import RecentOrder from "./RecentOrder";
import RecentUser from "./RecentUser";

function DashboardContent() {
  return (
    <section id="content">
      <AdminNavbar />

      <main>
        <HeadTitle />

        <Highliigths />

        <RecentOrder />
        {/* <RecentUser /> */}
      </main>
    </section>
  );
}

export default DashboardContent;
