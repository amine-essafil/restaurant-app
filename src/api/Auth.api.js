// Auth.api.js — Authentifiaction / auth endpoints
import client from "./Client.api";

// --- Login ---
export const getLogin = (email, password) =>
  client.post("/api/login", {
    email,
    password,
  });

// --- User ---
export const getUser = () =>
  client.get("/api/user");