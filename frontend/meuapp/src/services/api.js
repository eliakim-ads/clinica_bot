import axios from 'axios';
import { Platform } from 'react-native';

const defaultHost = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || defaultHost
});

export default api;
