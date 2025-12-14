import api from "./axios";

export const getSweets = () => api.get("/sweets");

export const createSweet = (data) => api.post("/sweets", data);

export const purchaseSweet = (id) =>
  api.post(`/sweets/${id}/purchase`);
export const restockSweet = (id, quantity) =>
  api.patch(`/sweets/${id}/restock`, { quantity });


export const deleteSweet = (id) =>
  api.delete(`/sweets/${id}`);
