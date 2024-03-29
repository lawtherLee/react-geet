import { SearchResults, Suggestion } from "@/types/data";
import { SearchAction } from "@/types/store";
import { getLocalHistories, setLocalHistories } from "@/utils/storage";

type stateType = {
  suggestions: Suggestion;
  history: Suggestion;
  searchResults: SearchResults[];
};
const initState: stateType = {
  suggestions: [],
  history: getLocalHistories() || [],
  searchResults: [],
};
const search = (state = initState, action: SearchAction) => {
  switch (action.type) {
    case "search/getSuggestion":
      return {
        ...state,
        suggestions: action.payload,
      };
    case "search/saveHistory":
      // 有重复的先删在存 / 先存在去重 / 最多10条 / 存本地
      let newHistory = [...state.history];
      const findItem = newHistory.indexOf(action.payload);
      if (findItem !== -1) {
        newHistory.splice(findItem, 1);
      }
      newHistory.unshift(action.payload);
      setLocalHistories(newHistory);
      return {
        ...state,
        history: newHistory.slice(0, 10),
      };
    case "search/clearHistory":
      return {
        ...state,
        history: [],
      };
    case "search/getSearchResults":
      return {
        ...state,
        searchResults: [...state.searchResults, ...action.payload],
      };
    default:
      return state;
  }
};
export default search;
