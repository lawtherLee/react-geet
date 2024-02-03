import { Channel, History, Token } from "@/types/data";

const CHANNEL_KEY = "geek-app-channel-88";
const tokenKey = "geek-h5-token";

// 获取本地token
export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKey) || "{}");
};

// 设置本地token
export const setToken = (value: Token) => {
  localStorage.setItem(tokenKey, JSON.stringify(value));
};

// 删除本地token
export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

// 判断本地是否有token
export const hasToken = () => {
  return !!getToken().token;
};

// 保存频道数据
export function setChannels(channels: Channel[]): void {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels));
}

// 获取频道数据
export function getChannelsStorage(): Channel[] {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY) || "[]");
}

// 搜索关键字的本地缓存键名
const SEARCH_HIS_KEY = "geek-h5-sh88-channel";

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): History => {
  return JSON.parse(localStorage.getItem(SEARCH_HIS_KEY) || "[]");
};

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: History): void => {
  localStorage.setItem(SEARCH_HIS_KEY, JSON.stringify(histories));
};

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_HIS_KEY);
};
