import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import { ArticleInfo } from "@/types/data";
import { useDispatch } from "react-redux";
import { editLikeStatus } from "@/store/actions/article";

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: "normal" | "reply";
  onComment?: () => void;
  info: ArticleInfo;
  onShow: () => void;
};

const CommentFooter = ({ type = "normal", onComment, info, onShow }: Props) => {
  const dispatch = useDispatch();
  // 点击赞
  const onClickLike = () => {
    dispatch(editLikeStatus(info.art_id, info.attitude));
  };
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onShow}>
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === "normal" && (
        <>
          <div className="action-item" onClick={onComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!info.comm_count && (
              <span className="bage">{info.comm_count}</span>
            )}
          </div>
          <div className="action-item" onClick={() => onClickLike()}>
            <Icon
              type={info.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"}
            />
            <p>点赞</p>
          </div>
          <div className="action-item">
            <Icon
              type={
                info.is_collected ? "iconbtn_collect_sel" : "iconbtn_collect"
              }
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === "reply" && (
        <div className="action-item">
          <Icon type={true ? "iconbtn_like_sel" : "iconbtn_like2"} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  );
};

export default CommentFooter;
