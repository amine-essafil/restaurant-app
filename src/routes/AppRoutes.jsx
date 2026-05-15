import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/menu" element={<Home />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

    </Routes>
  );
};

export default AppRoutes;