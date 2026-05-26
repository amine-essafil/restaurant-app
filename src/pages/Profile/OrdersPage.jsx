import React from "react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* Breadcrumb */}
        <nav className="orders-breadcrumb">
          <button onClick={() => navigate("/profile")}>
            Back
          </button>
        </nav>

        {/* Header */}
        <div className="orders-header">
          <h1>Order History</h1>
          <p>Track and view your past orders</p>
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;