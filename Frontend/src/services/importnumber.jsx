import api from "./api";

// Add imp number
export const createnumber = async (data) =>
  await api.post("http://localhost:5000/api/v2/important-numbers/create", data);

// get all imp numbers
export const viewnumber = async () => await api.get("http://localhost:5000/api/v2/important-numbers/");

// get imp number by id
export const getimpNumber = async (id) => await api.get(`http://localhost:5000/api/v2/important-numbers/${id}`);

// update imp number by id
export const updatenumber = async (id, data) =>
  await api.patch(`http://localhost:5000/api/v2/important-numbers/${id}`, data);

// delete imp number by id
export const deletenumber = async (id) =>
  await api.delete(`http://localhost:5000/api/v2/important-numbers/${id}`);