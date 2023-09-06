import React from "react";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import HeadTitle from "../AdminComponents/HeadTitle";
import AdminPrCards from "../AdminComponents/AdminProduts/AdminPrCards";

function AdminProducts() {
  return (
    <section id="content">
      <AdminNavbar />

      <main>
        <HeadTitle title="Products" />

        <AdminPrCards />
      </main>
    </section>
  );
}

export default AdminProducts;
