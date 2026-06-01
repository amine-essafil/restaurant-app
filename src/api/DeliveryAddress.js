import client from "./Client.api";

// --- deliveryAddresses ---
export const deliveryAddress = (data) =>
  client.post("/api/v1/addresses", data);

 


