// src/services/axiosInstance.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com',
});

// Request interceptor
instance.interceptors.request.use(
  config => {
    // You can modify the request config here (e.g., add headers, tokens, etc.)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  response => {
    // You can handle the response data here
    return response;
  },
  error => {
    // You can handle errors globally here
    return Promise.reject(error);
  }
);

export default instance;
