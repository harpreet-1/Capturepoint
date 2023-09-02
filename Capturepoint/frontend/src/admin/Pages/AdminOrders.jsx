import React from "react";
import RecentOrder from "../AdminComponents/Dashboard/RecentOrder";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import HeadTitle from "../AdminComponents/HeadTitle";

function AdminOrders() {
  return (
    <section id="content">
      <AdminNavbar />

      <main>
        <HeadTitle />

        <RecentOrder allData={true} />
        {/* <RecentUser /> */}
      </main>
    </section>
  );
}

export default AdminOrders;
