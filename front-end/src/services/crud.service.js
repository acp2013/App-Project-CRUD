import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "crud/all" ,  { headers: authHeader() });
};

const getAll = () => {
  return axios.get(API_URL + "crud" ,  { headers: authHeader() });
};

const get = id => {
  return axios.get(API_URL + `/crud/${id}` ,  { headers: authHeader() });
};

const create = data => {
  return axios.post(API_URL + "crud" , data , { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put(API_URL + `/crud/${id}` , data ,  { headers: authHeader() });
};

const remove = id => {
  return axios.delete(API_URL + `/crud/${id}` ,  { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(API_URL + "crud" ,  { headers: authHeader() });
};

const findByTitle = title => {
  return axios.get(API_URL + `/crud/${title}` ,  { headers: authHeader() });
};

export default {
  getPublicContent,
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};