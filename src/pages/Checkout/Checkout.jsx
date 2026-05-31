import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";


const LocationIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="location-icon-svg"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);


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
      <h1 className="checkout-title">Delivery Details</h1>
      
      <CheckoutProgressBar currentStep={2} />

      <div className="checkout-layout">
        {/* LEFT COLUMN - FORM */}
        <div className="checkout-form-container">
          <h2 className="form-section-title">Delivery Address</h2>
          
          <div onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
              {errors.full_name && <p className="errors">{errors.full_name[0]}</p>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+212 6XX-XXXXXX"
                required
              />
              {errors.phone && <p className="error-text">{errors.phone[0]}</p>}
            </div>

            {/* Address with Location Button */}
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Street Address <span className="required">*</span>
              </label>
              <div className="address-input-wrapper">
                <input
                  type="text"
                  id="address"
                  className="form-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your street address"
                  required
                />
                 {errors.street_address && <p className="error-text">{errors.street_address[0]}</p>}

                <button
                  type="button"
                  className="location-icon-btn"
                  onClick={handleGetLocation}
                  title="Get my location"
                >
                  <LocationIcon />
                </button>
              </div>
              
              {/* Location Notification */}
              {locationNotification && (
                <div className={`location-notification ${locationNotification.type}`}>
                  {locationNotification.message}
                </div>
              )}
            </div>

            {/* Delivery Instructions */}
            <div className="form-group">
              <label htmlFor="instructions" className="form-label">
                Delivery Instructions (Optional)
              </label>
              <textarea
                id="instructions"
                className="form-textarea"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g., Gate code is #1234, please don't ring the bell, leave at door..."
              />
            </div>

            {/* Submit Button */}
            <button type="button" className="checkout-submit-btn" onClick={handleSubmit}>
              Proceed to Payment →
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - ORDER SUMMARY */}
        <OrderSummaryBox />
      </div>
    </div>
  );
};


export default CheckoutPage;