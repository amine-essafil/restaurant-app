import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import CartPage from "../pages/Cart/Cart";
import CheckoutPage from "../pages/Checkout/Checkout";
import PaymentPage from "../pages/Payment/Payment";
import DeliveriesManagement from "../admin/Deliveries/DeliveriesManagement";
import { useAuth } from "../context/AuthContext";
import DriversManagement from "../admin/Drivers/DriversManagement";
import ReportsManagement from "../admin/Reports/ReportsManagement";
import MenuManagement from "../admin/Menu/MenuManagement";
import DashboardSimple from "../admin/Dashboard/DashboardSimple";
import { useAuth } from "../context/AuthContext";
import CustomersManagement from "../admin/Customers/CustomersManagement";
import OrdersAdmin from "../admin/Orders/OrdersAdmin";


const AppRoutes = () => {
  const protectedElement = (Component) => (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    );

    
const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth(); 
  const location = useLocation();
    if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (user.role !== "admin") {
    console.log("Access denied. Current role:", user.role);
    return <Navigate to="/" replace />; 
  }

  return children;
};


    const AdminRoute = ({ children }) => {
       const { isLoggedIn, user } = useAuth(); 
       const location = useLocation();
        if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
      }
      if (user.role !== "admin") {
        console.log("Accès refusé. Rôle actuel:", user.role);
        return <Navigate to="/" replace />; 
      }
      return children;
    };

  return (
    <Routes>  
      <Route  path="/"   element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/cart" element={<CartPage />} />

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
      <Route
        path="/checkout"
        element={protectedElement(CheckoutPage)}
       />
       <Route
         path="/payment"
         element={protectedElement(PaymentPage)}
        />
      <Route path="/contact" element={<Contact />} />

      
       {/*  Admin Deliveries Route */}
      <Route
             path="/admin/deliveries"
             element={
                      <AdminRoute>
                        <DeliveriesManagement />
                      </AdminRoute>
                    }
                  />

      <Route
             path="/admin/drivers"
             element={
                      <AdminRoute>
                        <DriversManagement />
                      </AdminRoute>
                    }
                  />
      <Route
             path="/admin/reports"
             element={
                      <AdminRoute>
                        <ReportsManagement />
                      </AdminRoute>
                    }
                  />
      <Route
             path="/admin/menu"
             element={
                      <AdminRoute>
                        <MenuManagement />

    

          {/* Admin Dashboard Route */}
       <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <DashboardSimple />
                      </AdminRoute>
                    }
                  />
       <Route
                    path="/admin/customers"
                    element={
                      <AdminRoute>
                        <CustomersManagement />
                      </AdminRoute>
                    }
                  />
       <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <OrdersAdmin />

                      </AdminRoute>
                    }
                  />
    </Routes>



  );
};

export default AppRoutes;