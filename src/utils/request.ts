import { updateToken } from './../store/actions/login'
import { hasToken, getToken } from './storage'
// 封装axios
import axios, { AxiosError } from 'axios'
import { Toast } from 'antd-mobile'
import history from './history'
import store from '@/store'
const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      config.headers!.Authorization = 'Bearer ' + getToken().token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error: AxiosError<{ message: string }>) {
    if (!error.response) {
      return Toast.show('服务器异常')
    }
    if (error.response.status === 401) {
      // console.log('token过期')
      const token = getToken()

      // 如果没有refresh_token: 过期 跳到登录页
      if (!token.refresh_token) {
        // 跳到登录页面
        history.replace('/login', {
          from: history.location.pathname,
        })
        Toast.show({
          content: '登陆过期',
        })
        return Promise.reject(error)
      }

      // 有refresh_token
      try {
        const res = await axios({
          method: 'PUT',
          url: baseURL + 'authorizations',
          headers: {
            Authorization: 'Bearer ' + token.refresh_token,
          },
        })
        // console.log(res.data.data.token)
        store.dispatch(
          updateToken({
            token: res.data.data.token,
            refresh_token: token.refresh_token,
          })
        )
        // console.dir(error)
        return instance.request(error.config)
      } catch (err) {
        // 跳到登录页面
        history.replace('/login', {
          from: history.location.pathname,
        })
        Toast.show({
          content: '登陆过期',
        })
        return Promise.reject(error)
      }
    }
    Toast.show({
      content: error.response?.data.message,
    })
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
