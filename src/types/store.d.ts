import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { Token } from './data'

// 存 所有redux相关的数据类型

// 登录的action
type LoginAction = {
  type: 'login/login'
  payload: Token
}

type RootAction = LoginAction

type RootState = ReturnType<typeof store.getState>
type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
export { RootState, RootThunkAction, LoginAction }
