import React from "react";
import RecentOrder from "../AdminComponents/Dashboard/RecentOrder";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import HeadTitle from "../AdminComponents/HeadTitle";

function AdminOrders() {
  console.log("admin order");
  return (
    <section id="content">
      <AdminNavbar />

      <main>
        <HeadTitle title="Orders" />

        <RecentOrder allData={true} />
        {/* <RecentUser /> */}
      </main>
    </section>
  );
}

export default AdminOrders;
