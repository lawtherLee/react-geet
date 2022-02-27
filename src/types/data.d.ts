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

type Channel = {
  id: number
  name: string
}

export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}

export type Suggestion = string[]

type ApiResponse<T> = AxiosResponse<T>

export {
  LoginFormValues,
  Channel,
  Token,
  ApiResponse,
  User,
  UserProfile,
  Suggestion,
}
