import styles from "./index.module.scss";
import { PullToRefresh } from "antd-mobile";
import ArticleItem from "@/pages/Home/components/ArticleItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleList } from "@/store/actions/home";
import { RootState } from "@/types/store";

type Props = {
  channelId: number;
};
const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleList(channelId, Date.now()));
  }, []);

  const { channelArticles } = useSelector((state: RootState) => state.home);
  const articleList = channelArticles[channelId] || {};
  return (
    <div className={styles.root}>
      <PullToRefresh>
        {/* 文章列表中的每一项 */}
        <div className="article-item">
          {articleList.results?.map((item) => {
            return <ArticleItem article={item} key={item.art_id} />;
          })}
        </div>
      </PullToRefresh>
    </div>
  );
};

export default ArticleList;
