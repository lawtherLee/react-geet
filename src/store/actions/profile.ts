import { RootThunkAction } from "@/types/store";
import { getUserApi, getUserProfileApi } from "@/api/user";

export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await getUserApi();
    dispatch({
      type: "profile/getUser",
      payload: res.data,
    });
  };
};

// 获取用户资料
export const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await getUserProfileApi();
    dispatch({
      type: "profile/getUserProfile",
      payload: res.data,
    });
  };
};
