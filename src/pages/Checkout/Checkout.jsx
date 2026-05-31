import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce(
  (sum, item) => sum + item.plat.prix * item.quantite,
  0
);

const deliveryFee = 5;
const total = subtotal + deliveryFee;

  return (
    <div className="checkout-page-container">
      <h1>Checkout</h1>
    </div>
  );
};

export default CheckoutPage;