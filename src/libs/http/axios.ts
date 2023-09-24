import axios from "axios";
import { apiUrl, apiUrlMockUp, isMockUp } from "@/constants/api/config.ts";

axios.interceptors.request.use((config) => {
  config.baseURL = isMockUp ? apiUrlMockUp : apiUrl;
  config.timeout = 60000; // 30 Second
  // other config
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: "",
        message: "",
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
