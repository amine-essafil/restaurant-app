import client from "./Client.api";

// --- getAllCategories ---
export const getAllCategories = () =>
  client.get("/api/v1/categories");

 


