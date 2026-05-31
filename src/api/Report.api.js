// Auth.api.js — Authentifiaction / auth endpoints
import client from "./Client.api";

// --- send Report ---
export const sendReport = (data) =>
  client.post("/api/v1/reports",data);

 



