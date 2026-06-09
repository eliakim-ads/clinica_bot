import axios from 'axios';

const api = axios.create({
  baseURL: 'EXPO_PUBLIC_API_URL'
});

export default api;