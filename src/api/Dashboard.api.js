import client from "./Client.api";

// --- Get stats ---
export const getStats = () =>
  client.get("/api/v1/admin/dashboard/stats");


// --- Get order distribution ---
export const getOrderDistribution = (period) =>
  client.get(`/api/v1/admin/dashboard/getOrderDistribution/${period}`);


// --- Get revenue trends ---
export const getRevenueTrends = (period) =>
  client.get(`/api/v1/admin/dashboard/chart/revenue/${period}`);