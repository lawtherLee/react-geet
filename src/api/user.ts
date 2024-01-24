import { LoginFormValues, User, UserProfile } from "@/types/data";
import request from "@/utils/request";

export const loginApi = (data: LoginFormValues) => {
  return request.post("/authorizations", data);
};

export const getCodeApi = (mobile: string) => {
  return request.get("/sms/codes/" + mobile);
};

export const getUserApi = () => {
  return request.get<User>("/user");
};

export const getUserProfileApi = () => {
  return request.get<UserProfile>("/user/profile");
};

export const updateUserProfileApi = (key: string, value: string) => {
  return request.patch("/user/profile", {
    [key]: value,
  });
};
