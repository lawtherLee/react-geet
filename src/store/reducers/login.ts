// 注意：该项目中，在 redux 中存储的 token 是个对象，包含两个 token：1 token（登录成功的令牌）  2 refresh_token（刷新token，token过期时换取新的token）
import { LoginAction } from "@/types/store";
import { getToken } from "@/utils/storage";

const initialState = getToken();
export const login = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case "login/login":
      return action.payload;
    case "logout/logout":
      return { token: "", refresh_token: "" };
    case "login/updatetoken":
      return action.payload;
    default:
      return state;
  }
};
