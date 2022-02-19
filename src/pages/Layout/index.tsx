import { TabBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Video from '@/pages/Video'
import Profile from '@/pages/Profile'
const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]

const Layout = () => {
  const history = useHistory()
  const location = useLocation()
  // tabbar变化
  const onTabBarChange = (key: string) => {
    history.push(key)
  }
  return (
    <div className={styles.root}>
      {/* 路由占位 */}
      <Route exact path="/home" component={Home} />
      <Route path="/home/question" component={Question} />
      <Route path="/home/video" component={Video} />
      <Route path="/home/profile" component={Profile} />
      {/* 底部tabbar */}
      <TabBar
        activeKey={location.pathname}
        onChange={onTabBarChange}
        className="tab-bar"
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon type={active ? item.icon + '_sel' : item.icon} />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
