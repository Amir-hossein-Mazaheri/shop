import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:8000/auth",
});

export default axiosAuth;
