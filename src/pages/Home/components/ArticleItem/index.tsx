import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
import { Article } from '@/types/data'
import { useHistory } from 'react-router-dom'

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type?: 0 | 1 | 3
  article: Article
}

const ArticleItem = ({ article }: Props) => {
  const history = useHistory()
  const {
    title,
    cover: { type, images },
    aut_name,
    comm_count,
    art_id,
  } = article
  return (
    <div className={styles.root}>
      <div
        onClick={() => {
          history.push('/article/' + art_id)
        }}
        className={classnames(
          'article-content',
          (type === 3 || type === 1) && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((image, index) => (
              <div key={index} className="article-img-wrapper">
                <img src={image} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>2 天前</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
