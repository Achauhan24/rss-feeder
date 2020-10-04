import axios from "axios";

const API_URL = "http://localhost:3000/api/";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "sign_in", {
        email,
        password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(first_name, last_name, email, password) {
    return axios.post(API_URL + "signup", {
      first_name,
      last_name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();