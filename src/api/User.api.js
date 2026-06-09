import client from "./Client.api";

// --- updateUsername ---
export const updateUsername = ({name}) =>
  client.put(`/api/v1/users/profile`, {
    name
  });

 // --- updateEmail ---
export const updateEmail = ({email}) =>
 client.put(`/api/v1/users/profile`, {
    email
  });

 // --- updatePhone ---
export const updatePhone = (phone) =>
 client.put(`/api/v1/users/profile`, {
    phone
  });

 // --- updatePassword ---
export const updatePassword = (data) =>
 client.put(`/api/v1/users/profile`, {
    data
  });
 // --- get All users ---
export const getAllUsers = () =>
  client.get('/api/v1/users');

 // --- Create users ---
export const createUsers = (userData) =>
  client.post('/api/v1/users', userData);