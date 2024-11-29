import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://jzcyx5w-estefanytorres-8081.exp.direct:3000"
  })
  
  export default apiClient;