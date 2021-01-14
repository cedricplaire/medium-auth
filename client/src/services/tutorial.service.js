import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api";

const getAll = () => {
  return axios.get(API_URL + '/tutorials', { headers: authHeader() });
};

const get = id => {
  return axios.get(API_URL + `/tutorials/${id}`, { headers: authHeader() });
};

const create = data => {
  return axios.post(API_URL + "/tutorials/", data, { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put(API_URL + `/tutorials/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return axios.delete(API_URL + `/tutorials/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(API_URL + `/tutorials`, { headers: authHeader() });
};

const findByTitle = title => {
  return axios.get(API_URL + `/tutorials?title=${title}`, { headers: authHeader() });
};

const findByAuthor = author => {
  return axios.get(API_URL + `/tutorials?author=${author}`, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByAuthor
};