import axios from "axios";
import Auth from "../Auth/Auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/shop",
  headers: {
    Authorization: Auth.access(),
  },
});

axiosInstance.interceptors.response.use();

export default axiosInstance;
