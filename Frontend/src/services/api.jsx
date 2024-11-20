import axios from "axios"
import constant from "../constant/constant";
const api = axios.create({
    baseURL: constant.API,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  
  export default api;