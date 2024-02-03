import { Suggestion } from "@/types/data";
import { SearchAction } from "@/types/store";

type stateType = {
  suggestions: Suggestion;
};
const initState: stateType = {
  suggestions: [],
};
const search = (state = initState, action: SearchAction) => {
  switch (action.type) {
    case "search/getSuggestion":
      return {
        ...state,
        suggestions: action.payload,
      };
    default:
      return state;
  }
};
export default search;
