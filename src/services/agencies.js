import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3000/api";

export const getAgencyList = () => {
    return axios({
        methos: 'GET',
        url: `${API_URL}/agencies`,
        headers: authHeader()
    })
}
