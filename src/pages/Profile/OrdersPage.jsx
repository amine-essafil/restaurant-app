import React from "react";
import { useNavigate } from "react-router-dom";
import { getClientOrders } from "../../api/Meals.api";

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

      </div>
    </div>
  );
};

export default OrdersPage;