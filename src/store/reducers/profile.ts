import { RootAction } from "@/types/store";
import { User, UserProfile } from "@/types/data";

const initialState = {
  user: {} as User,
  userProfile: {} as UserProfile,
};
const profile = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case "profile/getUser":
      return { ...initialState, user: action.payload };
    case "profile/getUserProfile":
      return { ...initialState, userProfile: action.payload };
    default:
      return state;
  }
};

export default profile;
