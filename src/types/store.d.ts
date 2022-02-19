import { User, UserProfile } from '@/types/data'
import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { Token } from './data'

// 存 所有redux相关的数据类型

// 登录的action
type LoginAction = {
  type: 'login/login'
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
type RootAction = LoginAction | ProfileAction

type RootState = ReturnType<typeof store.getState>
// 给每个action函数中如果操作异步指定的类型
type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
export { RootState, RootThunkAction, LoginAction, ProfileAction }
