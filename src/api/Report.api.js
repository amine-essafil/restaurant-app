// Auth.api.js — Authentifiaction / auth endpoints
import client from "./Client.api";

// --- send Report ---
export const sendReport = (data) =>
  client.post("/api/v1/reports",data);

 // --- Delete Report ---
export const deleteReport = (id) =>
  client.delete(`/api/v1/reports/${id}`)

 // --- markAsRead Report ---
export const markAsRead = (id) =>
  client.patch(`/api/v1/reports/${id}/read`)

 // --- markAsResolved Report ---
export const markAsResolved = (id) =>
  client.patch(`/api/v1/reports/${id}/resolve`)

 // ---  KPI ---
export const getKPIs = (data) =>
  client.get('/api/v1/reports/kpis')

 // ---  Get Reports ---
export const getReports = (params) =>
  client.get('/api/v1/reports', { params });





