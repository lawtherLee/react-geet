import { User, UserProfile } from '@/types/data'
import { ProfileAction } from '@/types/store'

const initState = {
  user: {} as User,
  userProfile: {} as UserProfile,
}
export const profile = (state = initState, actions: ProfileAction) => {
  // 判断是否为获取用户信息
  if (actions.type === 'profile/getUser') {
    return {
      ...state,
      user: actions.payload,
    }
  }

  // 判断是否为获取用户基本信息
  if (actions.type === 'profile/getUserProfile') {
    return {
      ...state,
      userProfile: actions.payload,
    }
  }

  return state
}
