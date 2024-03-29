import { RootThunkAction, SearchAction } from "@/types/store";
import request from "@/utils/request";
import { removeLocalHistories } from "@/utils/storage";

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

// 清空搜索历史
export const clearHistory = (): SearchAction => {
  removeLocalHistories();
  return {
    type: "search/clearHistory",
  };
};

// 获取搜索结果
export const getSearchResults = (
  keyword: string,
  page: number,
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("/search", {
      params: {
        q: keyword,
        page,
      },
    });
    dispatch({
      type: "search/getSearchResults",
      payload: res.data.results,
    });
  };
};
