import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api";

const getPublicContent = () => {
  return axios.get(`${API_URL}/users/all`);
};

const getUserBoard = () => {
  return axios.get(`${API_URL}/users/user`, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(`${API_URL}/users/mod`, { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(`${API_URL}/users/admin`, { headers: authHeader() });
};

const getUser = id => {
  return axios.get(`${API_URL}/users/${id}`, { headers: authHeader() });
};

const getFullUser = id => {
  return axios.get(`${API_URL}/user-full/${id}`, { headers: authHeader() });
};

const getAllUsers = () => {
  return axios.get(`${API_URL}/userslist/`, { headers: authHeader() });
};

const findByName = name => {
  return axios.get(`${API_URL}/users?title=${name}`, { headers: authHeader() });
};

const updateUser = (id, data) => {
  return axios.put(`${API_URL}/users/${id}/edit`, data, { headers: authHeader() });
};

const deleteUser = id => {
  return axios.delete(`${API_URL}/users/${id}/delete`, { headers: authHeader() });
};

const addRole = (id, data) => {
  return axios.post(`${API_URL}/users/${id}/role-add`, data, { headers: authHeader() })
}

const addFriend = (id, data) => {
  return axios.post(`${API_URL}/users/${id}/friend-add`, data, { headers: authHeader() })
}

const countUsers = () => {
  return axios.get(`${API_URL}/users/count`, { headers: authHeader() });
};

const countPublicUsers = () => {
  return axios.get(`${API_URL}/users/countpublic`, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUser,
  getFullUser,
  findByName,
  getAllUsers,
  updateUser,
  deleteUser,
  addRole,
  addFriend,
  countUsers,
  countPublicUsers
};
