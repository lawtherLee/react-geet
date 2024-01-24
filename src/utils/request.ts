// 封装axios
import axios, { AxiosError } from "axios";
import { Toast } from "antd-mobile";
import { getToken, hasToken } from "@/utils/storage";

const baseURL = "http://geek.itheima.net/v1_0/";
const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  if (hasToken()) {
    config.headers!.Authorization = "Bearer " + getToken().token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<{ message: string }>) => {
    if (!error.response) {
      Toast.show({ content: "服务器异常" });
    }
    Toast.show({ content: error.response?.data.message });
    return Promise.reject(error);
  },
);

export default instance;
