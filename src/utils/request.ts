// 封装axios
import axios, { AxiosError } from "axios";
import { Toast } from "antd-mobile";
import { getToken, hasToken } from "@/utils/storage";
import history from "@/utils/history";
import store from "@/store";
import { updateToken } from "@/store/actions/login";

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
  async (error: AxiosError<{ message: string }>) => {
    if (!error.response) {
      Toast.show({ content: "服务器异常" });
    }
    if (error.response?.status === 401) {
      const token = getToken();
      if (!token.refresh_token) {
        history.replace("/login", {
          from: history.location.pathname,
        });
        Toast.show("登录过期");
        return Promise.reject(error);
      }
      // 有refresh_token
      try {
        const res = await axios({
          method: "put",
          url: baseURL + "authorizations",
          headers: {
            Authorization: `Bearer ${token.refresh_token}`,
          },
        });
        store.dispatch(
          updateToken({
            token: res.data.data.token,
            refresh_token: token.refresh_token,
          }),
        );
        console.dir(error);
        // 无感刷新
        return await instance.request(error.config);
      } catch (err) {
        history.replace("/login", {
          from: history.location.pathname,
        });
        Toast.show("登录过期");
        return Promise.reject(error);
      }
    }
    Toast.show({ content: error.response?.data.message });
    return Promise.reject(error);
  },
);

export default instance;
