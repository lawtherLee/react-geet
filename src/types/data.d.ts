import { AxiosResponse } from 'axios'
// 存放页面的数据类型

// 登陆模块的类型
type LoginFormValues = {
  code: string
  mobile: string
}

type Token = {
  token: string
  refresh_token: string
}

type ApiResponse<T> = AxiosResponse<T>

export { LoginFormValues, Token, ApiResponse }
