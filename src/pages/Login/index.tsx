import {LoginFormValues} from '@/types/data'
import {Button, Form, Input, NavBar, Toast} from 'antd-mobile'
import {useHistory, useLocation} from 'react-router-dom'
import styles from './index.module.scss'
import {useDispatch} from 'react-redux'
import {login} from '@/store/actions/login'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation<{ from: string }>()
  // 提交表单
  const onFinish = async (values: LoginFormValues) => {
    dispatch(login(values))
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
  
  
  // 监视倒计时为0
  
  
  // 监视组件销毁
  
  
  return (
    <div className={styles.login}>
      {/* 导航栏区域 */}
      <NavBar onBack={() => history.goBack()}></NavBar>
      
      {/* 表单区域 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form
          
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Form.Item
            name="mobile"
            rules={[
              {required: true, message: '手机号不能为空'},
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入手机号"/>
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
              <span>
           验证码
              </span>
            }
          >
            <Input placeholder="请输入验证码"/>
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
        </Form
        >
      </div>
    </div>
  )
}

export default Login
