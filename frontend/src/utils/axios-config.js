import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

// base axios config
export const axiosInstance = axios.create({
  baseURL,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: false,
});
