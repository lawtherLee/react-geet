import { Article } from './data.d'
import { Channel, User, UserProfile } from '@/types/data'
import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { Token } from './data'

// 存 所有redux相关的数据类型

// 登录的action
type LoginAction =
  | {
      type: 'login/login'
      payload: Token
    }
  | {
      type: 'logout/logout'
    }
  | {
      type: 'login/updatetoken'
      payload: Token
    }

// 个人中心的action类型
type ProfileAction =
  | {
      type: 'profile/getUser'
      payload: User
    }
  | {
      type: 'profile/getUserProfile'
      payload: UserProfile
    }
// 首页的action类型
type HomeAction =
  | {
      type: 'home/saveChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveAllChannels'
      payload: Channel[]
    }
  | {
      type: 'home/setChannelActive'
      payload: number
    }
  | {
      type: 'home/setChannelArticles'
      payload: {
        channelId: number
        pre_timestamp: string
        articleList: Article[]
      }
    }
  | {
      type: 'home/setNewArticels'
      payload: {
        channelId: number
        pre_timestamp: string
        articleList: Article[]
      }
    }
type SearchAction = {
  type: 'search/getSuggestion'
  payload: Suggestion
}
type RootAction = LoginAction | ProfileAction | HomeAction | SearchAction

type RootState = ReturnType<typeof store.getState>
// 给每个action函数中如果操作异步指定的类型
type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
export {
  HomeAction,
  RootState,
  RootThunkAction,
  LoginAction,
  ProfileAction,
  SearchAction,
}
