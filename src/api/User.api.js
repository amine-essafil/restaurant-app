// Auth.api.js — Authentifiaction / auth endpoints
import client from "./Client.api";

// --- updateUsername ---
export const updateUsername = ({id,name}) =>
  client.patch(`/api/v1/modifier/${id}/username`, {
    name
  });

 // --- updateEmail ---
export const updateEmail = ({id,email}) =>
  client.patch(`/api/v1/modifier/${id}/email`, {
    email
  });

 // --- updatePhone ---
export const updatePhone = (phone) =>
  client.patch('/api/v1/modifier-phone', {
    phone
  });

 // --- updatePassword ---
export const updatePassword = (data) =>
  client.patch('/api/v1/modifier-password', data);

 // --- get All users ---
export const getAllUsers = () =>
  client.get('/api/v1/users');

 // --- Create users ---
export const createUsers = (userData) =>
  client.post('/api/v1/users', userData);

 

