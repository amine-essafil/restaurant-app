import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { OrderProvider } from "./context/OrderContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
/**
 * Utility component to scroll to top on page change
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
        <Router>
           <div className="app-container">
          <Navbar />
          <ScrollToTop />
          <main>
             <AppRoutes />
          </main>
          <Footer/>
          </div>
        </Router>
         </OrderProvider>  
      </CartProvider>
    </AuthProvider>
  );
}

export default App;