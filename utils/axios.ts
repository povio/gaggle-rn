import axios from "axios";

import { gitHubApiUrl } from "../constants/github";

const axiosInstance = axios.create({
  baseURL: gitHubApiUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // attach token to request header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
