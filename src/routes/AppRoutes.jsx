import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>  
      <Route  path="/"   element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;