import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://fundoscorpius.com:3000"
  })
  
  export default apiClient;