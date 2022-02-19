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

type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

type ApiResponse<T> = AxiosResponse<T>

export { LoginFormValues, Token, ApiResponse, User, UserProfile }
