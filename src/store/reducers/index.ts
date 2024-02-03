import { combineReducers } from "redux";

import { login } from "./login";
import profile from "./profile";
import home from "./home";
import search from "@/store/reducers/search";

const rootReducer = combineReducers({
  login,
  profile,
  home,
  search,
});

export default rootReducer;
