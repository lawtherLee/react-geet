import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";
import { getChannelsStorage, hasToken, setChannels } from "@/utils/storage";

// 获取频道列表
export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    // 判断是否登录
    if (hasToken()) {
      const res = await request.get("/channels");
      const { channels } = res.data;
      dispatch({
        type: "home/saveChannels",
        payload: channels,
      });
    } else {
      // 没登录看本地是否有数据
      const localChannels = getChannelsStorage();
      if (localChannels) {
        dispatch({
          type: "home/saveChannels",
          payload: localChannels,
        });
      } else {
        const res = await request.get("/channels");
        const { channels } = res.data;
        dispatch({
          type: "home/saveChannels",
          payload: channels,
        });
        setChannels(channels);
      }
    }
  };
};

// 获取所有频道
export const getAllChannels = (): RootThunkAction => {
  return async () => {
    const res = await request.get("/channels");
    console.log(res);
    // console.log(res.data.channels);
  };
};
