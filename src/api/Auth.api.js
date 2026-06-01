// Auth.api.js — Authentifiaction / auth endpoints
import client from "./Client.api";

// --- Login ---
export const getLogin = (email, password) =>
  client.post("/api/v1/login", {
    email,
    password,
  });

// --- User ---
export const getUser = () =>
  client.get("/api/v1/me");


// --- Register---
export const getRegister = (data) =>
  client.post("/api/v1/register", data);

// --- Logout ---
export const getLogout = () => 
      client.post('/api/v1/logout');




