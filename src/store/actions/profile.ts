import { RootThunkAction } from "@/types/store";
import {
  getUserApi,
  getUserProfileApi,
  updateUserProfileApi,
} from "@/api/user";
import request from "@/utils/request";

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

// 更新用户资料
export const updateUserProfile = (
  type: "" | "name" | "intro" | "gender" | "photo" | "birthday",
  value: string,
): RootThunkAction => {
  return async (dispatch) => {
    await updateUserProfileApi(type, value);
    dispatch(getUserProfile());
  };
};

// 更新用户头像
export const updateUserPhoto = (data: FormData): RootThunkAction => {
  return async (dispatch) => {
    await request.patch("/user/photo", data);
    dispatch(getUserProfile());
  };
};
