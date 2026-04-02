import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({ name: "Moujib", role: "user" });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};