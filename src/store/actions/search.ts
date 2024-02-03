import { RootThunkAction, SearchAction } from "@/types/store";
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

// 存储搜索历史
export const saveHistory = (val: string): SearchAction => {
  return {
    type: "search/saveHistory",
    payload: val,
  };
};
