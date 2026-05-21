// Auth.api.js — Authentifiaction / auth endpoints
import client from "./Client.api";

// --- updateUsername ---
export const updateUsername = ({id,name}) =>
  client.patch(`/api/modifier/${id}/username`, {
    name
  });

 // --- updateEmail ---
export const updateEmail = ({id,email}) =>
  client.patch(`/api/modifier/${id}/email`, {
    email
  });

 // --- updatePhone ---
export const updatePhone = (phone) =>
  client.patch('/api/modifier-phone', {
    phone
  });

 // --- updatePassword ---
export const updatePassword = (data) =>
  client.patch('/api/modifier-password', data);

 

 

