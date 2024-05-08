import axios from "axios";
import { BASE_URL } from "../constants/appConstants";

export const publicRouter = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
publicRouter.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
publicRouter.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle the error or perform any necessary actions
    return Promise.reject(error);
  }
);
