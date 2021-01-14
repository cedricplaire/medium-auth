import axios from "axios";

const API_URL = "http://localhost:8000/api/message";

const getAll = () => {
  return axios.get(`${API_URL}/findall`);
};

const get = id => {
  return axios.get(`${API_URL}/findOne/${id}`);
};

const create = data => {
  return axios.post(`${API_URL}/create`, data);
};

const update = (id, data) => {
  return axios.put(`${API_URL}/${id}/update`, data);
};

const remove = id => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

const removeAll = () => {
  return axios.delete(`${API_URL}/delete-all`);
};

const findAllPublished = () => {
    return axios.get(`${API_URL}/find-published/`);
  };

const findByAuthor = author => {
  return axios.get(`${API_URL}/find-by-name?author=${author}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findAllPublished,
  findByAuthor
};