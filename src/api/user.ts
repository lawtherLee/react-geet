import { LoginFormValues, Token, User, UserProfile } from '@/types/data'
import request from '@/utils/request'
import { AxiosResponse } from 'axios'

export const loginApi = (data: LoginFormValues) => {
  return request.post<AxiosResponse<Token>>('/authorizations', data)
}

export const getCodeApi = (mobile: string) => {
  return request.get('/sms/codes/' + mobile)
}

export const getUserApi = () => {
  return request.get<AxiosResponse<User>>('/user')
}

export const getUserProfileApi = () => {
  return request.get<AxiosResponse<UserProfile>>('/user/profile')
}

export const updateUserProfileApi = (key: string, value: string) => {
  return request.patch('/user/profile', {
    [key]: value,
  })
}
