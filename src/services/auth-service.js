import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'https://githubb-app.herokuapp.com',
      withCredentials: true,
    })
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService;