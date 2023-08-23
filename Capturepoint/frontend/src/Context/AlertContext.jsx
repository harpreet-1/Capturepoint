import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlertContext = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [showA, setShowA] = useState(false);

  const [alertData, setAlertData] = useState({ msg: "", type: "primary" });

  const toggleShowA = () => setShowA(!showA);
  function showAlert(msg, type = "info", time = 1500) {
    setAlertData({ msg, type });
    setShowA(true);

    setTimeout(() => {
      setShowA(false);
    }, time);
  }
  const contextValue = {
    showA,
    alertData,
    showAlert,
    toggleShowA,
  };
  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}
