import React from "react";
import AdminNavbar from "../AdminNavbar";

import Highliigths from "./HIghliigths";
import HeadTitle from "../HeadTitle";
import RecentOrder from "./RecentOrder";

function DashboardContent() {
  return (
    <section id="content">
      <AdminNavbar />

      <main>
        <HeadTitle title={"Dashboard"} />

        <Highliigths />

        <RecentOrder />
        {/* <RecentUser /> */}
      </main>
    </section>
  );
}

export default DashboardContent;
