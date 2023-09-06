// src/components/admin/AdminRoutes.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SideBar from "./AdminComponents/SideBar";
import { AdminSidebarProvider } from "../Context/AdminSidebarCotext";
import AdminOrders from "./Pages/AdminOrders";
import AdminProducts from "./Pages/AdminProducts";

function AdminRoutes() {
  return (
    <>
      <AdminSidebarProvider>
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/products" element={<AdminProducts />} />
        </Routes>
      </AdminSidebarProvider>
    </>
  );
}

export default AdminRoutes;
