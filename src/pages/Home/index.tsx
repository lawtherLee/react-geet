import React, { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import { Popup, Tabs } from "antd-mobile";
import {
  getAllChannels,
  getChannels,
  setChannelActive,
} from "@/store/actions/home";
import { useInitState } from "@/hooks";
import { Channel } from "@/types/data";
import Channels from "@/pages/Home/components/Channels";
import { useDispatch } from "react-redux";

const Home = () => {
  const { channels, active } = useInitState("home", getChannels);

  const [editChannelPopup, setEditChannelPopup] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChannels());
  }, []);

  // 切换tab
  const onTabsChange = (key: string) => {
    dispatch(setChannelActive(+key));
  };

  return (
    <div className={styles.root}>
      {/*频道列表*/}
      <Tabs activeKey={active} onChange={onTabsChange}>
        {(channels as Channel[]).map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            {item.name}
          </Tabs.Tab>
        ))}
      </Tabs>
      <div className={"tabs-opration"}>
        <Icon type={"iconbtn_search"} />
        <Icon
          type={"iconbtn_channel"}
          onClick={() => setEditChannelPopup(true)}
        />
      </div>

      {/*编辑频道弹出层*/}
      <Popup
        destroyOnClose
        position={"left"}
        onMaskClick={() => setEditChannelPopup(false)}
        visible={editChannelPopup}
      >
        <Channels onClose={() => setEditChannelPopup(false)} />
      </Popup>
    </div>
  );
};

export default Home;
