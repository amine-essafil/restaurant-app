import client from "./Client.api";

// --- available Drivers ---
export const availableDrivers = (params = {}) =>
  client.get(`/api/drivers/available/`,{
                params: params 
            });

