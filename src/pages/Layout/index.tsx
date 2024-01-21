import styles from './index.module.scss'
import {useHistory, useLocation} from 'react-router-dom'


const tabs = [
  {path: '/home', icon: 'iconbtn_home', text: '首页'},
  {path: '/home/question', icon: 'iconbtn_qa', text: '问答'},
  {path: '/home/video', icon: 'iconbtn_video', text: '视频'},
  {path: '/home/profile', icon: 'iconbtn_mine', text: '我的'},
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
      {/*<Route exact path="/home" component={Home} />*/}
      
      {/* 底部tabbar */}
    
    </div>
  )
}

export default Layout
