import React from "react";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import { Tabs } from "antd-mobile";
import { getChannels } from "@/store/actions/home";
import { useInitState } from "@/hooks";
import { Channel } from "@/types/data";

const Home = () => {
  const { channels } = useInitState("home", getChannels);
  console.log(channels);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getChannels());
  // }, []);
  return (
    <div className={styles.root}>
      {/*频道列表*/}
      <Tabs defaultActiveKey="1">
        {(channels as Channel[]).map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            {item.name}
          </Tabs.Tab>
        ))}
      </Tabs>
      <div className={"tabs-opration"}>
        <Icon type={"iconbtn_search"} />
        <Icon type={"iconbtn_channel"} />
      </div>
    </div>
  );
};

export default Home;
