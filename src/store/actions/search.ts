import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";

export const getSuggestionAction = (value: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("/suggestion", {
      params: {
        q: value,
      },
    });
    dispatch({
      type: "search/getSuggestion",
      payload: res.data.options,
    });
  };
};
