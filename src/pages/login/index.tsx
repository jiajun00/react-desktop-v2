import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { login, LoginParam } from '@/common/service/login'
import useStore, { MyState } from '@/store'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const setUserInfo = useStore((state: MyState) => state.setUserInfo)
  const setAppList = useStore((state: MyState) => state.setAppList)
  const onFinish = (values: LoginParam) => {
    login(values, res => {
      const { data } = res
      setUserInfo(data.userInfo)
      setAppList(data.appList)
      navigate('/', { replace: true })
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.bg}>
      <div className={styles.form}>
        <Form
          name="login"
          className={styles.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}>
            <Input
              prefix={<LockOutlined className={styles.loginFormIcon} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              className={styles.loginFormRemember}>
              <Checkbox>记住登录</Checkbox>
            </Form.Item>
            <a className={styles.loginFormForgot} href="">
              忘记密码
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}>
              登录
            </Button>
            或 <a href="">注册用户</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Index
