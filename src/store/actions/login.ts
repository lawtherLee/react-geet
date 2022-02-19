import { setToken } from './../../utils/storage'
import { LoginFormValues } from '@/types/data'
import { getCodeApi, loginApi } from '@/api/user'
import { RootThunkAction } from '@/types/store'

// 创建login的action的函数 并且是异步的
export const login = (values: LoginFormValues): RootThunkAction => {
  // 进行异步的操作, 发送请求获取数据
  return async (dispatch) => {
    const res = await loginApi(values)
    dispatch({
      type: 'login/login',
      payload: res.data.data,
    })
    setToken(res.data.data)
  }
}

// 我们需要在这里再次dispatch吗?
export const getCode = (mobile: string) => {
  return async () => {
    console.log('发送验证码', mobile)
    await getCodeApi(mobile)
  }
}