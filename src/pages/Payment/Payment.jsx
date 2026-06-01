import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import "./Payment.css";

// ============================================
// ICONS (SVG Components)
// ============================================

const CashIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const CardIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    className="loading-spinner"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
  </svg>
);

// ============================================
// PROGRESS BAR COMPONENT (Reused)
// ============================================

const CheckoutProgressBar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Cart", status: "completed" },
    { number: 2, label: "Delivery", status: "completed" },
    {
      number: 3,
      label: "Payment",
      status: currentStep === 3 ? "active" : "pending",
    },
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-line">
        <div
          className="progress-line-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {steps.map((step, index) => (
        <div key={index} className={`progress-step ${step.status}`}>
          <div className="progress-step-circle">
            {step.status !== "completed" && step.number}
          </div>
          <div className="progress-step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );

  
  // ============================================
  // ORDER SUMMARY COMPONENT (Reused)
  // ============================================
  
  const OrderSummaryBox = () => {
    const { cartItems } = useCart();
  
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.plat.prix * item.quantite,
      0
    );
    const deliveryFee = 5.0;
    const total = subtotal + deliveryFee;
  
    return (
      <div className="order-summary-box">
        <h2 className="summary-title">Order Summary</h2>
  
        <div className="summary-items">
          {cartItems.map((item) => (
            <div key={item.plat_id} className="summary-item">
              <img
                src={item.plat.image}
                alt={item.plat.nom}
                className="summary-item-image"
              />
              <div className="summary-item-details">
                <div className="summary-item-name">{item.plat.nom}</div>
                <div className="summary-item-qunatity">Qty: {item.quantite}</div>
              </div>
              <div className="summary-item-price">
                ${(item.plat.prix * item.quantite).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
  
        <div className="summary-line subtotal">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
  
        <div className="summary-line">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
  
        <div className="summary-total">
          <span>Total</span>
          <span className="summary-total-amount">${total.toFixed(2)}</span>
        </div>
      </div>
    );
  };
  

return (
    <div className="payment-page-container">
      <h1 className="payment-title">Payment Method</h1>

      <CheckoutProgressBar currentStep={3} />

      <div className="payment-layout">
        {/* LEFT COLUMN - PAYMENT METHOD */}
        <div className="payment-form-container">
          <h2 className="form-section-title">Choose Payment Method</h2>

          {/* Payment Method Options */}
          <div className="payment-methods">
            {/* OPTION 1: Cash on Delivery */}
            <div
              className={`payment-option ${
                paymentMethod === "cash" ? "active" : ""
              }`}
              onClick={() => {
                setPaymentMethod("cash");
              }}
            >
              <div className="payment-option-radio">
                <div className="radio-dot"></div>
              </div>
              <div className="payment-option-icon">
                <CashIcon />
              </div>
              <div className="payment-option-content">
                <div className="payment-option-title">Cash on Delivery</div>
                <div className="payment-option-desc">
                  Pay with cash when your order arrives
                </div>
              </div>
            </div>

            {/* OPTION 2: Credit/Debit Card */}
            <div
              className={`payment-option ${
                paymentMethod === "card" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="payment-option-radio">
                <div className="radio-dot"></div>
              </div>
              <div className="payment-option-icon">
                <CardIcon />
              </div>
              <div className="payment-option-content">
                <div className="payment-option-title">Credit / Debit Card</div>
                <div className="payment-option-desc">
                  Pay securely with your card
                </div>
              </div>
            </div>
          </div>

          {/* CARD FORM (Only shows if card is selected) */}
          {paymentMethod === "card" && (
            <PayPalButton
              amount={total.toFixed(2)}
              onSuccess={handlePaypalSuccess}
            />
          )}

          {/* PLACE ORDER BUTTON */}
          <button
            className={`place-order-btn ${isProcessing ? "processing" : ""}`}
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <LoadingSpinner />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Place Order - ${total.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN - ORDER SUMMARY */}
        <OrderSummaryBox />
      </div>
    </div>
  );


export default PaymentPage;