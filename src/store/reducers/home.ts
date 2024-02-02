import { HomeAction } from "@/types/store";
import { Article, Channel } from "@/types/data";

type StateType = {
  channels: Channel[];
  allChannels: Channel[];
  active: number;
  channelArticles: {
    [key: number]: {
      pre_timestamp: string;
      results: Article[];
    };
  };
};
const initState: StateType = {
  channels: [],
  allChannels: [],
  active: 0,
  channelArticles: {},
};
const home = (state = initState, action: HomeAction) => {
  switch (action.type) {
    case "home/saveChannels":
      return {
        ...state,
        channels: action.payload,
      };
    case "home/saveAllChannels":
      return {
        ...state,
        allChannels: action.payload,
      };
    case "home/setChannelActive":
      return {
        ...state,
        active: action.payload,
      };
    case "home/setChannelArticles":
      const oldState =
        state.channelArticles[action.payload.channelId]?.results || [];
      return {
        ...state,
        channelArticles: {
          ...state.channelArticles,
          [action.payload.channelId]: {
            pre_timestamp: action.payload.pre_timestamp,
            results: [...oldState, ...action.payload.articleList],
          },
        },
      };
    case "home/setNewArticels":
      return {
        ...state,
        channelArticles: {
          ...state.channelArticles,
          [action.payload.channelId]: {
            pre_timestamp: action.payload.pre_timestamp,
            results: action.payload.articleList,
          },
        },
      };
    default:
      return state;
  }
};
export default home;
