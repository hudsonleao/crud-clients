import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'auth', {
        user: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem('token', response.data.data.token);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      user: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();