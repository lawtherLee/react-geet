import Icon from '@/components/Icon'
import { Tabs, Popup } from 'antd-mobile'
import styles from './index.module.scss'
import { useInitState } from '@/utils/hooks'
import {
  getAllChannels,
  getChannels,
  setChannelActive,
} from '@/store/actions/home'
import { Channel } from '@/types/data'
import { useState } from 'react'
import Channels from './components/Channels'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ArticleList from './components/ArticleList'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  const { channels, active } = useInitState('home', getChannels)
  // 管理编辑频道弹出层的显示和隐藏
  const [editChannelPopup, setEditChannelPopup] = useState(false)

  // 关闭弹层
  const onClose = () => {
    setEditChannelPopup(false)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllChannels())
  }, [])

  // 监听tabs变化
  const onTabsChange = (key: string) => {
    dispatch(setChannelActive(+key))
  }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs activeKey={active + ''} onChange={onTabsChange}>
        {(channels as Channel[]).map((item) => {
          return (
            <Tabs.Tab title={item.name} key={item.id}>
              <ArticleList channelId={item.id} />
            </Tabs.Tab>
          )
        })}
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
        <Icon
          type="iconbtn_channel"
          onClick={() => setEditChannelPopup(true)}
        />
      </div>

      {/* 编辑频道弹出层 */}
      <Popup
        position="left"
        visible={editChannelPopup}
        onMaskClick={() => {
          setEditChannelPopup(false)
        }}
        bodyStyle={{ height: '100vh' }}
      >
        <Channels onClose={onClose} />
      </Popup>
    </div>
  )
}

export default Home
