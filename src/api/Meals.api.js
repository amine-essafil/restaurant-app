// meals.api.js — Menu / food items endpoints
import client from "./Client.api";

// --- Meals ---
export const getMeals = () =>
  client.get("/api/plats");

// --- Categories ---
export const getCategories = () =>
  client.get("/api/categories");

// --- Reviews ---
export const incrementReview = (mealId) =>
  client.post(`/api/plats/${mealId}/review`);

// --- getClientOrders ---
  export const getClientOrders = () =>
       client.get(`/api/orders/client`);