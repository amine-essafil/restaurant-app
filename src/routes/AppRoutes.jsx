import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/Login/Login";
import SignupPage from "../pages/Signup/Signup";
import LoginSuccess from "../pages/LoginSuccess/LoginSuccess";
import ProfileMain from "../pages/Profile/ProfileMain";
import AccountPage from "../pages/Profile/AccountPage";
import ChangePasswordForm from "../pages/Profile/ChangePasswordForm";
import OrdersPage from "../pages/Profile/OrdersPage";
import Contact from "../pages/Contact/Contact";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const protectedElement = (Component) => (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    );
  return (
    <Routes>  
      <Route  path="/"   element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      
       {/* Profile Routes */}
      <Route
        path="/profile"
        element={protectedElement(ProfileMain)}
      />

      <Route
        path="/profile/account"
        element={protectedElement(AccountPage)}
      />

      <Route
        path="/profile/orders"
        element={protectedElement(OrdersPage)}
      />

      <Route
        path="/profile/change-password"
        element={protectedElement(ChangePasswordForm)}
      />

      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
};

export default AppRoutes;