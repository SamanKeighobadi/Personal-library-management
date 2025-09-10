import axios, { AxiosError } from "axios";

axios.defaults.url = import.meta.env.BASE_URL;

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
