import { HomeAction } from "@/types/store";
import { Channel } from "@/types/data";

type StateType = {
  channels: Channel[];
  allChannels: Channel[];
  active: number;
};
const initState: StateType = {
  channels: [],
  allChannels: [],
  active: 0,
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
    default:
      return state;
  }
};
export default home;
