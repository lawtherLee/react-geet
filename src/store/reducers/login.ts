import { getToken } from './../../utils/storage'
// 注意：该项目中，在 redux 中存储的 token 是个对象，包含两个 token：1 token（登录成功的令牌）  2 refresh_token（刷新token，token过期时换取新的token）
import { LoginAction } from '@/types/store'

const initialState = getToken()
export const login = (state = initialState, action: LoginAction) => {
  if (action.type === 'login/login') {
    return action.payload
  }

  if (action.type === 'logout/logout') {
    return {
      token: '',
      refresh_token: '',
    }
  }
  if (action.type === 'login/updatetoken') {
    return action.payload
  }
  return state
}
