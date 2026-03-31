import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";  

import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <BrowserRouter>

          <div className="app-container">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/menu" element={<MenuPage />} />
              </Routes>
            </main>

          </div>

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;