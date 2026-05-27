import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import SignupPage from "../pages/Signup/Signup";
import LoginSuccess from "../pages/LoginSuccess/LoginSuccess";
import ProfileMain from "../pages/Profile/ProfileMain";
import AccountPage from "../pages/Profile/AccountPage";
import ChangePasswordForm from "../pages/Profile/ChangePasswordForm";
import OrdersPage from "../pages/Profile/OrdersPage";

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
      <Route path="/profile/change-password" element={<ChangePasswordForm />} />
      <Route path="/profile/orders" element={<OrdersPage />} />

    </Routes>
  );
};

export default AppRoutes;