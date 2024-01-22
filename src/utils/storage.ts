import {Token} from '@/types/data'

const CHANNEL_KEY = 'geek-app-channel-88'
const tokenKey = 'geek-h5-token'

// 获取本地token
export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKey) || '{}')
}

// 设置本地token
export const setToken = (value: Token) => {
  localStorage.setItem(tokenKey, JSON.stringify(value))
}

// 删除本地token
export const removeToken = () => {
  localStorage.removeItem(tokenKey)
}

// 判断本地是否有token
export const hasToken = () => {
  return !!getToken().token
}

