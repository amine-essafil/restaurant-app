import client from "./Client.api";

// --- available Drivers ---
export const availableDrivers = (params = {}) =>
  client.get(`/api/v1/drivers/available/`,{
                params: params 
            });

