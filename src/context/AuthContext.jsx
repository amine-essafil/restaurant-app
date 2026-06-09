import React, { createContext, useContext, useEffect, useState } from "react";
import { getLogin, getLogout, getRegister, getUser } from "../api/Auth.api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const [errors,seterrors] = useState({});

  const [loading, setLoading] = useState(false);

useEffect(() => {
  const checkUser = async () => {
    try {
      const res = await getUser();
      console.log(res)
      if(res.data) {
        console.log(res.data)
        setUser(res.data);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch(err) {
      setUser(null);
      setIsLoggedIn(false);
    }finally {
        setLoading(false);
      }
  };
  checkUser();
}, []);

  // LOGIN
const login = async (email, password) => {
try {
const response = await getLogin(email, password);
      if (response.status === 200) {
               localStorage.setItem('token', response.data.access_token);
               setUser(response.data.user);
               console.log(user)
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
    errors,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};