import { Article } from './../../types/data.d'
import { Channel } from '@/types/data'
import { AxiosResponse } from 'axios'
import { hasToken, setChannels } from '@/utils/storage'
import request from '@/utils/request'
import { RootThunkAction } from '@/types/store'
import { getChannels as getChannelsStorage } from '@/utils/storage'
import { HomeAction } from '@/types/store'

// 获取频道列表的action函数
export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    // 判断用户是否登录
    if (hasToken()) {
      // 登录
      const res = await request.get('/user/channels')
      const { channels } = res.data.data
      dispatch({
        type: 'home/saveChannels',
        payload: channels,
      })
    } else {
      // 未登录
      const channels = getChannelsStorage()
      if (channels.length) {
        dispatch({
          type: 'home/saveChannels',
          payload: channels,
        })
      } else {
        const res = await request.get('/user/channels')
        const { channels } = res.data.data
        dispatch({
          type: 'home/saveChannels',
          payload: channels,
        })
        setChannels(channels)
      }
    }
  }
}

export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<AxiosResponse<{ channels: Channel[] }>>(
      '/channels'
    )
    dispatch({
      type: 'home/saveAllChannels',
      payload: res.data.data.channels,
    })
  }
}

export const setChannelActive = (payload: number): HomeAction => {
  return {
    type: 'home/setChannelActive',
    payload,
  }
}

export const addChannel = (item: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    let channels: Channel[] = []
    if (hasToken()) {
      // 有token 发请求
      await request.patch('/user/channels', {
        channels: [item],
      })
    } else {
      // 没有token 存本地
      setChannels(channels)
    }
    // redux存
    channels = [...getState().home.channels, item]
    dispatch({
      type: 'home/saveChannels',
      payload: channels,
    })
  }
}

export const delChannel = (id: number): RootThunkAction => {
  return async (dispatch, getState) => {
    if (hasToken()) {
      // 登录 发送请求删除数据库
      await request.delete('/user/channels', {
        data: {
          channels: [id],
        },
      })
    } else {
      // 未登录 删除本地数据
      const { channels } = getState().home
      const newChannels = channels.filter((item) => item.id !== id)
      setChannels(newChannels)
    }
    dispatch(getChannels())
  }
}

export const getArticleList = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      AxiosResponse<{
        pre_timestamp: string
        results: Article[]
      }>
    >('articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    dispatch({
      type: 'home/setChannelArticles',
      payload: {
        channelId: channel_id,
        pre_timestamp: res.data.data.pre_timestamp,
        articleList: res.data.data.results,
      },
    })
  }
}

export const getNewArticles = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      AxiosResponse<{
        pre_timestamp: string
        results: Article[]
      }>
    >('articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    dispatch({
      type: 'home/setNewArticels',
      payload: {
        channelId: channel_id,
        pre_timestamp: timestamp,
        articleList: res.data.data.results,
      },
    })
  }
}
