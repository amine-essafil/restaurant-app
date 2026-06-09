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

// --- Delete order  ---
export const deleteOrder = ({id}) =>
  client.delete(`/api/v1/admin/orders/${id}`);


// --- Get order Users  ---
export const getOrderUsers = () =>
  client.get("/api/v1/admin/orders/users");

