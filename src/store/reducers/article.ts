import { RootAction } from "@/types/store";
import { ArticleInfo, CommentRes } from "@/types/data";

type StateType = {
  articleInfo: ArticleInfo;
  comments: CommentRes;
};
const initState: StateType = {
  articleInfo: {} as ArticleInfo,
  comments: {} as CommentRes,
};
const article = (state = initState, action: RootAction) => {
  switch (action.type) {
    case "article/getArticleInfo":
      return {
        ...state,
        articleInfo: action.payload,
      };
    case "article/getComments":
      return {
        ...state,
        comments: action.payload,
      };
    case "article/addComment":
      return {
        ...state,
        comments: {
          ...state.comments,
          results: [action.payload, ...state.comments.results],
        },
      };
    default:
      return state;
  }
};
export default article;
