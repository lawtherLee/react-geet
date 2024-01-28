import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";

export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("/channels");
    const { channels } = res.data;
    dispatch({
      type: "home/saveChannels",
      payload: channels,
    });
  };
};
