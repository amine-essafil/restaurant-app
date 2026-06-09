import client from "./Client.api";

// --- getAllProducts ---
export const getAllProducts = () =>
  client.get("/api/v1/products");

// --- Post Product ---
export const PostProduct = (platData) =>
  client.post("/api/v1/admin/products", platData);

// --- update Product ---
export const UpdateProduct = (itemId, data) =>
  client.put(`/api/v1/admin/products/${itemId}`, data);

// --- Delete Product ---
export const DeleteProduct = (itemId) =>
  client.delete(`/api/v1/admin/products/${itemId}`);


