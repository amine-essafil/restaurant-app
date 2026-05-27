import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClientOrders } from "../../api/Meals.api";
import { useOrder } from "../../context/OrderContext";
import emptyOrdersImage from "../../assets/images/empty-orders.svg";

const ShoppingBagIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const OrdersPage = () => {
  const navigate = useNavigate();

  const { orders, setOrders } = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
        try {
        const response =await getClientOrders();

        setOrders(response.data);

        } catch (error) {

        console.error(error);

        }
    };

    fetchOrders();
    }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">

        <nav className="orders-breadcrumb">
          <button onClick={() => navigate("/profile")}>
            Back
          </button>
        </nav>

        <div className="orders-header">
          <h1>Order History</h1>
          <p>Track and view your past orders</p>
        </div>
        {/* Orders Content */}
        <div className="orders-content">
        {
          orders.length === 0 ? (
            <div className="empty-orders">
              <img
                src={emptyOrdersImage}
                alt="No orders yet"
              />

              <h3>No Orders Yet</h3>

              <button
                onClick={() => navigate("/")}
              >
                <ShoppingBagIcon />
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="order-card"
                >
                  <h3>Order #{order.id}</h3>

                  <span>{order.statut}</span>

                  <span>${order.prix_total}</span>
                </div>
              ))}
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;