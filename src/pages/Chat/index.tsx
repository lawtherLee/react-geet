import Icon from "@/components/Icon";
import { Input, NavBar } from "antd-mobile";
import styles from "./index.module.scss";
import history from "@/utils/history";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/utils/storage";

const Chat = () => {
  const [messageList, setMessageList] = useState<
    {
      type: "robot" | "user";
      text: string;
    }[]
  >([{ type: "robot", text: "小勇正在赶来..." }]);

  const { user } = useSelector((state: RootState) => state.profile);

  const [message, setMessage] = useState("");

  const clientRef = useRef<Socket | null>(null);
  useEffect(() => {
    // 创建客户端实例
    const client = io("http://toutiao.itheima.net", {
      query: {
        token: getToken().token,
      },
      transports: ["websocket"],
    });
    clientRef.current = client;
    // 监听是否链接成功
    client.on("connect", () => {
      setMessageList([{ type: "robot", text: "我是小勇，我来了" }]);
    });
  }, []);

  // 监听回车
  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      clientRef.current?.emit("message", {
        msg: message,
        timestamp: Date.now(),
      });
    }
  };
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {/* 机器人的消息 */}
        {messageList.map((item, index) =>
          item.type === "robot" ? (
            <div key={index} className="chat-item">
              <Icon type="iconbtn_xiaozhitongxue" />
              <div className="message">{item.text}</div>
            </div>
          ) : (
            <div key={index} className="chat-item user">
              <img src={user.photo} alt="" />
              <div className="message">{item.text}</div>
            </div>
          ),
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
  );
};

export default Chat;
