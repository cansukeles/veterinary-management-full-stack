import axios from "axios";

const devBaseURL = "http://localhost:8080/api/v1";
const prodBaseURL = "https://veterinary-management-api.onrender.com/api/v1";

// base axios config
export const axiosInstance = axios.create({
  baseURL: prodBaseURL,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: false,
});
