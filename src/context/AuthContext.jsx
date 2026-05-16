import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {

      // fake auth simulation
      if (email && password) {
        setUser({
          name: "Moujib",
          role: "user",
          email,
        });

        setIsLoggedIn(true);

        return { success: true };
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};