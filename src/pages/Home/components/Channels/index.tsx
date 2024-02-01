import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/store";
import classnames from "classnames";
import { Channel } from "@/types/data";
import { differenceBy } from "lodash";
import { addChannel, setChannelActive } from "@/store/actions/home";
import { useState } from "react";

type Props = {
  onClose: () => void;
};
const Channels = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const { channels, active } = useSelector((state: RootState) => state.home);
  // 推荐频道 计算数据 allChannels - channels
  const recomendChannels = useSelector((state: RootState): Channel[] => {
    const { allChannels } = state.home;

    // 看每一项是否在channels中
    // return allChannels.filter((item) => {
    //   return !channels.some(
    //     (channelItem: Channel) => channelItem.id === item.id,
    //   );
    // });

    // 使用lodash找不同
    return differenceBy(allChannels, channels, "id");
  });

  // 点击我的频道切换
  const onClickMyChannel = (id: number) => {
    dispatch(setChannelActive(id));
    onClose();
  };

  // 编辑
  const [isEdit, setIsEdit] = useState(false);

  // 点击频道推荐添加到我的频道
  const onClickRecommendChannel = (item: Channel) => {
    dispatch(addChannel(item));
  };
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item", isEdit ? "edit" : "")}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {isEdit ? "点击删除" : "点击进入频道"}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "完成" : "编辑"}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {channels.map((item) => {
              return (
                <span
                  onClick={() => onClickMyChannel(item.id)}
                  key={item.id}
                  className={classnames(
                    "channel-list-item",
                    active === item.id ? "selected" : "",
                  )}
                >
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
          <div className="channel-list">
            {recomendChannels.map((item) => (
              <span
                onClick={() => onClickRecommendChannel(item)}
                key={item.id}
                className={"channel-list-item"}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
