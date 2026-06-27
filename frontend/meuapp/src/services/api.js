import axios from 'axios';
import { Platform } from 'react-native';
import { getAuthToken } from './authStorage';

const defaultHost = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || defaultHost
});

api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
