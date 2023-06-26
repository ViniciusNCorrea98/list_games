import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'dev-email-address': 'vinicius@gmail.com'
  }
});

export default axiosInstance;