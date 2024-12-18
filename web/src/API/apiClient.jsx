import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api-node.fundoscorpius.com"
  })
  
  export default apiClient;