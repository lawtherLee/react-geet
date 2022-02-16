import { NavBar, Form, Input, Button } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
const Login = () => {
  const history = useHistory()
  return (
    <div className={styles.login}>
      {/* 导航栏区域 */}
      <NavBar onBack={() => history.goBack()}></NavBar>

      {/* 表单区域 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form validateTrigger={['onChange', 'onBlur']}>
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
            <Input placeholder="请输入手机号" />
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
            extra={<span>发送验证码</span>}
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
