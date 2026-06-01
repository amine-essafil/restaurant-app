import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import "./Payment.css";

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