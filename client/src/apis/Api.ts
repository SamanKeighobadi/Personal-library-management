import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
