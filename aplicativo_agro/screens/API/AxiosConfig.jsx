import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://fundoscorpius.com/proyecto/cpanel:3000"
  })
  
  export default apiClient;