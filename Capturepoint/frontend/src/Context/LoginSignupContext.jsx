import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setisLogin] = useState(true);
  const [loginUsername, setloginUsername] = useState("Guest");

  const setUsername = (name) => {
    setloginUsername(name);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const setLoginTrue = () => {
    setisLogin(true);
  };
  const setLoginFalse = () => {
    setisLogin(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const contextValue = {
    isLogin,
    showLogin,
    showSignup,
    loginUsername,

    setUsername,

    setLoginTrue,
    setLoginFalse,

    handleLoginClick,
    handleCloseLogin,

    handleSignupClick,
    handleCloseSignup,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
