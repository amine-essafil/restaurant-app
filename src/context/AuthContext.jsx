import React, { createContext, useContext, useState } from "react";
import { getLogin } from "../api/Auth.api";

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
try {
const response = await getLogin(email, password);
console.log(response.token)
      if (response.status === 200) {
               localStorage.setItem('token', response.token);
              const res = await getUser();
               setUser(res.data);
                setIsLoggedIn(true);
                seterrors({});

        return { success: true };
            }
              } catch (error) {
        if (error.response?.status === 422) {
              seterrors(error.response.data.errors);
            }
            setIsLoggedIn(false);
                return { success: false };
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