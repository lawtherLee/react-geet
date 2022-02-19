import { ApiResponse, LoginFormValues, Token } from '@/types/data'
import request from '@/utils/request'
import { AxiosResponse } from 'axios'

export const loginApi = (data: LoginFormValues) => {
  return request.post<AxiosResponse<Token>>('/authorizations', data)
}

export const getCodeApi = (mobile: string) => {
  return request.get('/sms/codes/' + mobile)
}
