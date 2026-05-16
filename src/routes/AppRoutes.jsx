import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import SignupPage from "../pages/Signup/Signup";

const AppRoutes = () => {
  return (
    <Routes>  
      <Route  path="/"   element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />

    </Routes>
  );
};

export default AppRoutes;