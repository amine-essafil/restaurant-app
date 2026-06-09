import client from "./Client.api";

// --- PatchStatus ---
export const PatchStatus = (email, password) =>
  client.post("/api/v1/login", {
    email,
    password,
  });






