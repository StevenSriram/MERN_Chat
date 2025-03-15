import axios from "axios";

const API_URL = "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: API_URL,

  // * allow cross-origin requests
  withCredentials: true,
});

export default axiosInstance;
