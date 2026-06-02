// meals.api.js — Menu / food items endpoints
import client from "./Client.api";

// --- Meals ---
export const getMeals = () =>
  client.get("/api/v1/products");

// --- Categories ---
export const getCategories = () =>
  client.get("/api/v1/categories");

// --- Reviews ---
export const incrementReview = (mealId) =>
  client.post(`/api/v1/plats/${mealId}/review`);

// --- getClientOrders ---
  export const getClientOrders = () =>
       client.get(`/api/v1/orders/client`);