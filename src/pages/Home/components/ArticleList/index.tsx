import styles from "./index.module.scss";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import ArticleItem from "@/pages/Home/components/ArticleItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleList, getNewArticles } from "@/store/actions/home";
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
  const { results } = channelArticles[channelId] || {};

  // 上拉触底
  const [hasMore, setHasMore] = useState(false);
  const loadMore = async () => {
    dispatch(getArticleList(channelId, Date.now()));
  };
  // 下拉刷新
  const onRefresh = async () => {
    dispatch(getNewArticles(channelId, Date.now() + ""));
  };
  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        {/* 文章列表中的每一项 */}
        <div className="article-item">
          {results?.map((item) => {
            return <ArticleItem article={item} key={item.art_id} />;
          })}
        </div>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  );
};

export default ArticleList;
