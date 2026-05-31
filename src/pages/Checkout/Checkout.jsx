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
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* LEFT FORM */}
        <div className="checkout-form-container">
          <h2>Delivery Info</h2>

          <input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        {/* RIGHT SUMMARY */}
        <div className="order-summary-box">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.plat_id}>
              {item.plat.name} x {item.quantite}
            </div>
          ))}

          <hr />

          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Delivery: ${deliveryFee.toFixed(2)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;