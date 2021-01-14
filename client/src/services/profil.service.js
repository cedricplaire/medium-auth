import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const getProfil = id => {
  return axios.get(`${API_URL}/profil/${id}`, { headers: authHeader() });
};

/* const createProfil = data => {
  return axios.post(`${API_URL}/profil/`, data, { headers: authHeader() });
}; */

const updateProfil = (id, data) => {
  return axios.put(`${API_URL}/profil/${id}/edit`, data, { headers: authHeader() });
};

const removeProfil = id => {
  return axios.delete(`${API_URL}/profil/delete/${id}`, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProfil,
  //createProfil,
  updateProfil,
  removeProfil,
};