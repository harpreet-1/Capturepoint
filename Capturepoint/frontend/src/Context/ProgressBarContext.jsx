import React, { createContext, useContext, useState } from "react";

const ProgressBarContext = createContext();

export const useProgressBarContext = () => useContext(ProgressBarContext);

export function ProgressBarProvider({ children }) {
  const [progress, setProgress] = useState(10);

  const contextValue = {
    progress,
    setProgress,
  };

  return (
    <ProgressBarContext.Provider value={contextValue}>
      {children}
    </ProgressBarContext.Provider>
  );
}
