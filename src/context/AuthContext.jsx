import React, { createContext, useContext, useState } from "react";
import { getLogin, getLogout, getRegister } from "../api/Auth.api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const [errors,seterrors] = useState({});

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

// ----------SIGNUP---------------
const register = async (name, email, password, password_confirmation) => {
  try {
   seterrors({});
      const response = await getRegister(
      {      name,
            email,
            password,
            password_confirmation}
        );
      localStorage.setItem('token', response.data.token);
      const res = await getUser();
          setUser(res.data);
              setIsLoggedIn(true);

        return { success: true };

          } catch (error) {
              if (error.response?.status === 422) {
          seterrors(error.response.data.errors);
              }
        setIsLoggedIn(false);
            return { success: false };
              }
              };


// ----------LOGOUT---------------
const logout = async()=>{
    try {
      const resp= await getLogout();
            localStorage.removeItem('token')
            setIsLoggedIn(false);
           } catch(error){
            console.error("Logout failed:", error);
              }
          }  


  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    register,
    errors
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};