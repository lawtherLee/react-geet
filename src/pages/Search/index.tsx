import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDebounceFn } from 'ahooks'
import { getSuggestion } from '@/store/actions/search'
import { RootState } from '@/types/store'
import { Suggestion } from '@/types/data'

const SearchPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = useState('')
  const setIdRef = useRef(0)
  const { suggestions } = useSelector((state: RootState) => state.search)

  const { run: gutSuggestion } = useDebounceFn(
    () => {
      dispatch(getSuggestion(value))
    },
    {
      wait: 800,
    }
  )

  const onChange = (e: string) => {
    setValue(e)
    gutSuggestion()
  }

  useEffect(() => {
    return () => {
      clearTimeout(setIdRef.current)
    }
  }, [])

  // 处理高亮
  const highlight = (text: string) => {
    return text.replace(
      new RegExp(value, 'gi'),
      (match) => '<span>' + match + '</span>'
    )
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <SearchBar
          onChange={onChange}
          value={value}
          placeholder="请输入关键字搜索"
        />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames('search-result', true ? 'show' : '')}>
        {(suggestions as Suggestion).map((item, index) => {
          return (
            <div className="result-item" key={index}>
              <Icon className="icon-search" type="iconbtn_search" />
              <div
                className="result-value text-overflow"
                dangerouslySetInnerHTML={{
                  __html: highlight(item),
                }}
              ></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchPage
