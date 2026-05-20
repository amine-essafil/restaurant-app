import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import SignupPage from "../pages/Signup/Signup";
import LoginSuccess from "../pages/LoginSuccess/LoginSuccess";
import ProfileMain from "../pages/Profile/ProfileMain";
import AccountPage from "../pages/Profile/AccountPage";

const AppRoutes = () => {
  return (
    <Routes>  
      <Route  path="/"   element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/profile" element={<ProfileMain />} />
      <Route path="/profile/account" element={<AccountPage />} />

    </Routes>
  );
};

export default AppRoutes;