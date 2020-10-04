import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3000/api";

export const getCategoryList =() => {

  return axios({
    methos: 'GET',
    url: `${API_URL}/categories`,
    headers: authHeader()
  })
}

export const addCategory = (data) =>{
  return axios({
    method: 'POST',
    url: `${API_URL}/agency_categories`,
    headers: authHeader(),
    data
  })
}

export const getAgency = () => {
  return axios({
    method: 'GET',
    url: `${API_URL}/agency_categories`,
    headers: authHeader()
    })
}

export const deleteCategory = (id) => {
  return axios({
    method: 'DELETE',
    url: `${API_URL}/agency_categories/${id}`,
    headers: authHeader()
    })
}
