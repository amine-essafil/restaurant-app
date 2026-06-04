import client from "./Client.api";

// --- available Drivers ---
export const availableDrivers = (params = {}) =>
  client.get(`/api/v1/drivers/available/`,{
                params: params 
            });
    
// --- Drivers ---
export const getDrivers = () =>
  client.get(`/api/v1/drivers`);    

// --- Driver Dashboard ---
export const DriverDashboard = () =>
  client.get(`/api/v1/drivers/dashboard`);

// --- Drivers ---
export const CreateDriver = (formData) =>
  client.post(`/api/v1/drivers`, formData);

// --- Driver Update ---
export const DriverUpdate = (driverId, formData) =>
  client.put(`/api/v1/drivers/${driverId}`, formData);

// --- Driver Delete ---
export const DriverDelete = (driverId) =>
  client.delete(`/api/v1/drivers/${driverId}`);

// --- Driver Update Status ---
export const DriverUpdateStatus = (driverId, statut) =>
  client.patch(`/api/v1/drivers/${driverId}/status`, statut);

// --- Assign Driver To Order  ---
export const assignToOrder = ({driver_id,commande_id}) =>
  client.post(`/api/v1/drivers/assign`, { driver_id, commande_id });



