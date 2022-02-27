import { hasToken } from '@/utils/storage'
import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

const PrivattRoute = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (hasToken()) {
          return children
        }
        // 获取当前访问的地址location.pathname
        // 获取到后端返回的当前用户的权限路由表 存到 redux
        // 如果在 ?  return children
        // 如果不在? return Redirect 404
        // 侧边菜单栏: 根据路由表动态循环生成 进行递归遍历
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location.pathname,
              },
            }}
          />
        )
      }}
    />
  )
}

export default PrivattRoute
