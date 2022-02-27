import Icon from '@/components/Icon'
import { NavBar, Input } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import io, { Socket } from 'socket.io-client'
import { getToken } from '@/utils/storage'
import { useRef } from 'react'

const Chat = () => {
  const history = useHistory()
  const [messageList, setMessageList] = useState<
    { type: 'user' | 'robot'; text: string }[]
  >([{ type: 'robot', text: '正在连接中...' }])
  const token = getToken()

  const { user } = useSelector((state: RootState) => state.profile)

  const [message, setMessage] = useState('')
  const clientRef = useRef<Socket | null>(null)
  const chatListRef = useRef<HTMLDivElement>(null)
  // 监听敲回车
  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      clientRef.current?.emit('message', {
        msg: message,
        timestamp: Date.now(),
      })
      setMessageList((messageList) => {
        return [
          ...messageList,
          {
            type: 'user',
            text: message,
          },
        ]
      })
      setMessage('')
    }
  }

  useEffect(() => {
    // 创建一个客户端实例
    const client = io('http://toutiao.itheima.net', {
      query: {
        token: token.token,
      },
      transports: ['websocket'],
    })

    clientRef.current = client

    // 监听是否链接成功
    client.on('connect', () => {
      setMessageList([{ type: 'robot', text: '亲,以链接成功,您有什么疑惑?' }])
    })

    // 监听服务端返回的消息
    client.on('message', (data) => {
      setMessageList((messageList) => {
        return [
          ...messageList,
          {
            type: 'robot',
            text: data.msg,
          },
        ]
      })
      const current = chatListRef.current!
      current.scrollTop = current.scrollHeight
    })
    return () => {
      client.close()
    }
  }, [])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
        {/* 机器人的消息 */}
        {messageList.map((item, index) =>
          item.type === 'user' ? (
            <div key={index} className="chat-item user">
              <img src={user.photo} alt="" />
              <div className="message">{item.text}</div>
            </div>
          ) : (
            <div key={index} className="chat-item">
              <Icon type="iconbtn_xiaozhitongxue" />
              <div className="message">{item.text}</div>
            </div>
          )
        )}

        {/* 用户的消息 */}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          value={message}
          onChange={(e) => setMessage(e)}
          onKeyUp={onSendMessage}
          className="no-border"
          placeholder="请描述您的问题"
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
