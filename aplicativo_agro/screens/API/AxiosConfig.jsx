import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://fundoscorpius.com/proyecto/cpanel"
  })
  
  export default apiClient;