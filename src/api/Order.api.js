import client from "./Client.api";

// --- Create order ---
export const createOrder = (data) =>
  client.post("/api/v1/orders", data);

// --- Update order status ---
export const updateOrderStatus = ({id, statut}) =>
  client.patch(`/api/v1/orders/${id}`, { statut });

// --- Dashboard Orders ---
export const getDashboardOrders = () =>
  client.get("/api/v1/admin/orders/dashboard");
