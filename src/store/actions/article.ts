import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";

export const getArticleInfo = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("articles/" + id);
    dispatch({
      type: "article/getArticleInfo",
      payload: res.data,
    });
  };
};

export const getComments = (params: {
  type: "a" | "c";
  source: string;
}): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("comments", {
      params,
    });
    dispatch({
      type: "article/getComments",
      payload: res.data,
    });
  };
};

export const editLikeStatus = (
  id: string,
  attitude: number,
): RootThunkAction => {
  return async (dispatch) => {
    if (attitude === 1) {
      await request.delete("article/likings/" + id);
    } else {
      await request.post("article/likings", { target: id });
    }
    dispatch(getArticleInfo(id));
  };
};
