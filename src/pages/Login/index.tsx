import { LoginFormValues } from '@/types/data'
import { NavBar, Form, Input, Button, Toast } from 'antd-mobile'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { getCode, login } from '@/store/actions/login'
import { useEffect, useRef, useState } from 'react'
import { InputRef } from 'antd-mobile/es/components/input'
const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation<{ from: string }>()
  // 提交表单
  const onFinish = async (values: LoginFormValues) => {
    await dispatch(login(values))
    Toast.show({
      content: '登录成功',
      afterClose: () => {
        if (location.state) {
          return history.replace(location.state.from)
        }
        history.push('/home')
      },
    })
  }

  // 获取验证码
  const [form] = Form.useForm()
  const inputRef = useRef<InputRef>(null)
  const [countDown, setCountDown] = useState(0)
  const timerRef = useRef(0)
  const onGetCode = async () => {
    // 获取手机号数据
    const mobile = form.getFieldValue('mobile')
    // 获取手机号校验的错误信息
    const mobileError = form.getFieldError('mobile')
    if (!mobile || mobileError.length) {
      inputRef.current?.focus()
      return
    }
    await dispatch(getCode(mobile))
    setCountDown(60)
    timerRef.current = window.setInterval(() => {
      console.log('定时器')
      setCountDown((countDown) => countDown - 1)
    }, 1000)
  }

  // 监视倒计时为0
  useEffect(() => {
    if (countDown === 0) {
      window.clearInterval(timerRef.current)
    }
  }, [countDown])

  // 监视组件销毁
  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className={styles.login}>
      {/* 导航栏区域 */}
      <NavBar onBack={() => history.goBack()}></NavBar>

      {/* 表单区域 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form
          form={form}
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '手机号不能为空' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input ref={inputRef} placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '验证码不能为空',
              },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误',
              },
            ]}
            extra={
              <span onClick={countDown === 0 ? onGetCode : undefined}>
                {countDown === 0 ? '发送验证码' : `${countDown}s后重新获取`}
              </span>
            }
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              className="login-submit"
              color="primary"
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
