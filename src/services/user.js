import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3000/api";

export const addUser = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/users`,
        headers: authHeader(),
        data
    })
}
