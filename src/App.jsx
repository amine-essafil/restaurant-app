import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
        <Router>
          <Navbar />
          <AppRoutes />
          <Footer/>
        </Router>
         </OrderProvider>  
      </CartProvider>
    </AuthProvider>
  );
}

export default App;