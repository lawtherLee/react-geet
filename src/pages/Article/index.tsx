import { InfiniteScroll, NavBar } from "antd-mobile";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";
import styles from "./index.module.scss";

import Icon from "@/components/Icon";
import CommentItem from "./components/CommentItem";
import CommentFooter from "./components/CommentFooter";
import { useDispatch } from "react-redux";
import { getArticleInfo, getComments } from "@/store/actions/article";
import dayjs from "dayjs";
import { useInitState } from "@/hooks";
import "highlight.js/styles/vs2015.css";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import { Comment } from "@/types/data";

const Article = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  // const { articleInfo } = useSelector((state: RootState) => state.article);

  const { articleInfo } = useInitState("article", () => getArticleInfo(id));

  // useEffect(() => {
  //   dispatch(getArticleInfo(id));
  // }, []);

  // 主动给代码设置高亮
  useEffect(() => {
    const codeEle = document.querySelectorAll(".dg-html pre code");
    // console.log(codeEle);
    codeEle.forEach((item) => {
      hljs.highlightElement(item as HTMLElement);
    });
  }, []);

  // 头部跟随内容缩放
  const [isShowHeaderAuth, setIsShowHeaderAuth] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapperRef.current!.addEventListener("scroll", () => {
      const rect = authorRef.current!.getBoundingClientRect();
      if (rect.top < 0) {
        setIsShowHeaderAuth(true);
      } else {
        setIsShowHeaderAuth(false);
      }
    });
  }, []);

  // 控制评论显示位置
  const commentRef = useRef<HTMLDivElement>(null);
  const [isComment, setIsComment] = useState(false);
  const onComment = () => {
    if (isComment) {
      wrapperRef.current?.scrollTo(0, 0);
    } else {
      wrapperRef.current?.scrollTo(0, commentRef.current?.offsetTop! - 90);
    }
    setIsComment(!isComment);
  };

  // 获取评论数据
  const { comments } = useInitState("article", () =>
    getComments({ type: "a", source: id }),
  );
  console.log(comments);
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleInfo.title}</h1>

            <div className="info">
              <span>{dayjs(articleInfo.pubdate).format("YYYY-MM-DD")}</span>
              <span>{articleInfo.read_count} 阅读</span>
              <span>{articleInfo.comm_count} 评论</span>
            </div>

            <div className="author" ref={authorRef}>
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

          <div className="comment-list" ref={commentRef}>
            {(comments.results as Comment[])?.map((item) => {
              return <CommentItem key={item.com_id} />;
            })}

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
          {isShowHeaderAuth && (
            <div className="nav-author">
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
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter onComment={onComment} />
      </div>
    </div>
  );
};

export default Article;
