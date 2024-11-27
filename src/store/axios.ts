import axios from "axios";

//const baseURL = import.meta.env.VITE_BASE_URL_BACKEND;
const baseURL = 'https://flashcardsplayground.bandwaggon.ai'

const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  timeout: 5000,
  withCredentials: true, // This is important for sending cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;