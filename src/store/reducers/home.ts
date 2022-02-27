import { Article } from './../../types/data.d'
import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'
type StateType = {
  channels: Channel[]
  allChannels: Channel[]
  active: number
  channelArticles: {
    [key: number]: {
      pre_timestamp: string
      results: Article[]
    }
  }
}
const initState: StateType = {
  channels: [],
  allChannels: [],
  active: 0,
  channelArticles: {},
}
const home = (state = initState, action: HomeAction) => {
  if (action.type === 'home/saveChannels') {
    return {
      ...state,
      channels: action.payload,
    }
  }

  if (action.type === 'home/saveAllChannels') {
    return {
      ...state,
      allChannels: action.payload,
    }
  }

  if (action.type === 'home/setChannelActive') {
    return {
      ...state,
      active: action.payload,
    }
  }

  if (action.type === 'home/setChannelArticles') {
    const oldState =
      state.channelArticles[action.payload.channelId]?.results || []
    return {
      ...state,
      channelArticles: {
        ...state.channelArticles,
        [action.payload.channelId]: {
          pre_timestamp: action.payload.pre_timestamp,
          results: [...oldState, ...action.payload.articleList],
        },
      },
    }
  }

  if (action.type === 'home/setNewArticels') {
    return {
      ...state,
      channelArticles: {
        ...state.channelArticles,
        [action.payload.channelId]: {
          pre_timestamp: action.payload.pre_timestamp,
          results: action.payload.articleList,
        },
      },
    }
  }
  return state
}

export default home
