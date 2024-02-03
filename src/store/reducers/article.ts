import { RootAction } from "@/types/store";
import { ArticleInfo } from "@/types/data";

type StateType = {
  articleInfo: ArticleInfo;
};
const initState: StateType = {
  articleInfo: {} as ArticleInfo,
};
const article = (state = initState, action: RootAction) => {
  switch (action.type) {
    case "article/getArticleInfo":
      return {
        ...state,
        articleInfo: action.payload,
      };
    default:
      return state;
  }
};
export default article;
