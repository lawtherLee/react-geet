import { RootThunkAction } from "@/types/store";
import request from "@/utils/request";

export const getArticleInfo = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get("articles/" + id);
    console.log(res);
    dispatch({
      type: "article/getArticleInfo",
      payload: res.data,
    });
  };
};
