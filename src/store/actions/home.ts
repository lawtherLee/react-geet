import { HomeAction, RootThunkAction } from "@/types/store";
import request from "@/utils/request";
import { getChannelsStorage, hasToken, setChannels } from "@/utils/storage";
import { Channel } from "@/types/data"; // 获取频道列表

// 获取频道列表
export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    // 判断是否登录
    if (hasToken()) {
      const res = await request.get("/user/channels");
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
        const res = await request.get("/user/channels");
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
  return async (dispatch) => {
    const res = await request.get("/channels");
    dispatch({
      type: "home/saveAllChannels",
      payload: res.data.channels,
    });
  };
};

// 设置点击频道高亮
export const setChannelActive = (payload: number): HomeAction => {
  return {
    type: "home/setChannelActive",
    payload,
  };
};

// 添加频道
export const addChannel = (item: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    let channels: Channel[] = [];
    if (hasToken()) {
      // 发请求
      const res = await request.patch("/user/channels", {
        channels: [item],
      });
      console.log(res);
    } else {
      // 存本地
      setChannels(channels);
    }
    channels = [...getState().home.channels, item];
    dispatch({
      type: "home/saveChannels",
      payload: channels,
    });
  };
};

export const delChannel = (id: number): RootThunkAction => {
  return async (dispatch, getState) => {
    if (hasToken()) {
      await request.delete("/user/channels", {
        data: {
          channels: [id],
        },
      });
    } else {
      const { channels } = getState().home;
      const newChannels = (channels as Channel[]).filter(
        (item) => item.id !== id,
      );
      setChannels(newChannels);
    }
    dispatch(getChannels());
  };
};

export const getArticleList = (
  channel_id: number,
  timestamp: number,
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("/articles", {
      params: {
        channel_id,
        timestamp,
      },
    });
    dispatch({
      type: "home/setChannelArticles",
      payload: {
        channelId: channel_id,
        pre_timestamp: res.data.pre_timestamp,
        articleList: res.data.results,
      },
    });
  };
};

export const getNewArticles = (
  channel_id: number,
  timestamp: string,
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("/articles", {
      params: {
        channel_id,
        timestamp,
      },
    });
    dispatch({
      type: "home/setNewArticels",
      payload: {
        channelId: channel_id,
        pre_timestamp: timestamp,
        articleList: res.data.results,
      },
    });
  };
};
