import { InfiniteScroll, NavBar } from "antd-mobile";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";
import styles from "./index.module.scss";

import Icon from "@/components/Icon";
import CommentItem from "./components/CommentItem";
import CommentFooter from "./components/CommentFooter";
import { useDispatch } from "react-redux";
import { getArticleInfo } from "@/store/actions/article";
import dayjs from "dayjs";
import { useInitState } from "@/hooks";

const Article = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  // const { articleInfo } = useSelector((state: RootState) => state.article);

  const { articleInfo } = useInitState("article", () => getArticleInfo(id));

  // useEffect(() => {
  //   dispatch(getArticleInfo(id));
  // }, []);

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleInfo.title}</h1>

            <div className="info">
              <span>{dayjs(articleInfo.pubdate).format("YYYY-MM-DD")}</span>
              <span>{articleInfo.read_count} 阅读</span>
              <span>{articleInfo.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames(
                  "follow",
                  articleInfo.is_followed ? "followed" : "",
                )}
              >
                {articleInfo.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{ __html: articleInfo.content }}
            />
            <div className="date">
              发布文章时间：{dayjs(articleInfo.pubdate).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>20 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll
              hasMore={false}
              loadMore={async () => {
                console.log(1);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames("follow", true ? "followed" : "")}>
                {true ? "已关注" : "关注"}
              </span>
            </div>
          }
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  );
};

export default Article;
