import { useHistory, useLocation } from "react-router-dom";
import { InfiniteScroll, NavBar } from "antd-mobile";

import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSearchResults } from "@/store/actions/search";
import { RootState } from "@/types/store";
import ArticleItem from "@/pages/Home/components/ArticleItem";

const Result = () => {
  let page = 1;

  const history = useHistory();
  const location = useLocation();
  const urlSearchObj = new URLSearchParams(location.search);
  const keyWord = urlSearchObj.get("keyword");
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    dispatch(getSearchResults(keyWord!, page));
  }, []);

  // 加载更多
  const [hasMore, setHasMore] = useState(true);
  const loadMore = async () => {
    dispatch(getSearchResults(keyWord!, page));

    setHasMore(false);

    page = page + 1;
  };
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {searchResults.map((item) => {
          return <ArticleItem article={item} key={item.art_id} />;
        })}

        <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
      </div>
    </div>
  );
};

export default Result;
