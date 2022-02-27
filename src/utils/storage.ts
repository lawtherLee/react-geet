import { Channel, Token } from '@/types/data'

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

/**
 * 保存频道数据
 * @param channels
 */
export function setChannels(channels: Channel[]): void {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 获取频道列表数据
 * @returns
 */
export function getChannels(): Channel[] {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY) || '[]')
}
