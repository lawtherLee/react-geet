import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store";
import classnames from "classnames";

type Props = {
  onClose: () => void;
};
const Channels = ({ onClose }: Props) => {
  const { channels } = useSelector((state: RootState) => state.home);
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">1</span>
            <span className="channel-item-edit">"完成"</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {channels.map((item) => {
              return (
                <span key={item.id} className={classnames("channel-list-item")}>
                  {item.name}
                  <Icon type={"iconbtn_tag_close"} />
                </span>
              );
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">2</div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
