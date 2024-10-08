import axios from "axios";

const BASE_URL = process.env.PUBLIC_API_URL || 'http://localhost:3030/api/v1/'; 

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

//Function with CASE WHEN for methods GET, POST, PUT, DELETE
const apiPetition = async (method, endpoint, data = null) => {
    let response;
    console.log(BASE_URL)
    console.log(method, endpoint, data)
    try {
      switch (method.toLowerCase()) {
        case "get":
          response = await axiosInstance.get(`${BASE_URL}${endpoint}`);
          break;
        case "post":
          response = await axiosInstance.post(`${BASE_URL}${endpoint}`, data);
          break;
        case "put":
          response = await axiosInstance.put(`${BASE_URL}${endpoint}`, data);
          break;
        case "delete":
          response = await axiosInstance.delete(`${BASE_URL}${endpoint}`);
          break;
        default:
          throw new Error(`Invalid HTTP method: ${method}`);
      }
      return response;
    } catch (error) {
        // Si la respuesta contiene datos de error, los devuelve
        if (error.response && error.response.data) {
          return error.response.data;
        } else {
          return new Error(`Error making ${method.toUpperCase()} API request: ${error.message}`);
        }
    }
};  

export default apiPetition;