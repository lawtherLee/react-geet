import { HomeAction } from "@/types/store";
import { Channel } from "@/types/data";

type StateType = {
  channels: Channel[];
};
const initState: StateType = {
  channels: [],
};
const home = (state = initState, action: HomeAction) => {
  switch (action.type) {
    case "home/saveChannels":
      return {
        ...state,
        channels: action.payload,
      };
    default:
      return state;
  }
};
export default home;
