import axios from "axios";
import authHeader from '../services/auth-header';

const API_URL = "http://localhost:3000/api";

export const getFeed = (id) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/feeds`,
    params: {
      agency_category_id: id
    },
    headers: authHeader()

  })
}

export const increaseCount = (id) => {
  return axios({
    method: 'PUT',
    url: `${API_URL}/feeds/${id}`,
    headers: authHeader()
  })
}

export const getAllFeed = (id) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/feeds/list_all`,
    params: {
      category_id: id
    },
    headers: authHeader()
  })
}

export const view = (date) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/feeds/click_report`,
    params: {
      date: date
    },
    headers: authHeader()
  })
}

export const generate = (date) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/feeds/generate_click_report`,
    params: {
      date: date,
    },
    headers: authHeader()
  })
}

