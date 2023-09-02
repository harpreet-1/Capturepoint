import React, { createContext, useContext, useState } from "react";

const AdminSidebarCotext = createContext();

export const useAdminSidebarCotext = () => useContext(AdminSidebarCotext);

export function AdminSidebarProvider({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const contextValue = {
    sidebarVisible,
    setSidebarVisible,
  };

  return (
    <AdminSidebarCotext.Provider value={contextValue}>
      {children}
    </AdminSidebarCotext.Provider>
  );
}
