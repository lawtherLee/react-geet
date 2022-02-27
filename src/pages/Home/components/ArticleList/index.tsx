import ArticleItem from '../ArticleItem'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList, getNewArticles } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'

type Props = {
  channelId: number
}
const ArticleList = ({ channelId }: Props) => {
  const dispatch = useDispatch()
  const { channelArticles } = useSelector((state: RootState) => state.home)
  const { results = [] } = channelArticles[channelId] || {}
  useEffect(() => {
    dispatch(getArticleList(channelId, Date.now() + ''))
  }, [])

  // 上拉触底
  const [hasMore, setHasMore] = useState(false)
  const loadMore = async () => {
    dispatch(getArticleList(channelId, Date.now() + ''))
  }

  // 下啦刷新
  const onRefresh = async () => {
    dispatch(getNewArticles(channelId, Date.now() + ''))
  }
  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        {/* 文章列表中的每一项 */}
        <div className="article-item">
          {results.map((item) => {
            return <ArticleItem article={item} key={item.art_id} />
          })}
        </div>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
