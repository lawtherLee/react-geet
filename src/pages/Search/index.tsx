import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar, Toast } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDebounceFn } from 'ahooks'
import {
  clearHistory,
  getSuggestion,
  saveHistory,
} from '@/store/actions/search'
import { RootState } from '@/types/store'
import { Suggestion } from '@/types/data'

const SearchPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = useState('')
  const setIdRef = useRef(0)
  const { suggestions } = useSelector((state: RootState) => state.search)
  const [isSearching, setIsSearching] = useState(false)

  const { run: gutSuggestion } = useDebounceFn(
    () => {
      dispatch(getSuggestion(value))
    },
    {
      wait: 800,
    }
  )

  // 输入框变化
  const onChange = (e: string) => {
    setValue(e)
    if (e) {
      gutSuggestion()
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
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

  // 点击搜索
  const onSearch = (value: string) => {
    if (value.trim() === '') return Toast.show('请输入搜索关键字')
    dispatch(saveHistory(value))
    history.push('/search/result?keyword=' + value)
  }

  const { history: searchHistory } = useSelector(
    (state: RootState) => state.search
  )

  // 点击搜索历史
  const onClickHistory = (value: string) => {
    // 进行逻辑区分
    onSearch(value)
  }

  // 点击清空搜索历史
  const onClearHistory = () => {
    dispatch(clearHistory())
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span onClick={() => onSearch(value)} className="search-text">
            搜索
          </span>
        }
      >
        <SearchBar
          onChange={onChange}
          value={value}
          placeholder="请输入关键字搜索"
        />
      </NavBar>

      {isSearching ? (
        <div className={classnames('search-result', true ? 'show' : '')}>
          {(suggestions as Suggestion).map((item, index) => {
            return (
              <div
                className="result-item"
                key={index}
                onClick={() => onSearch(item)}
              >
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
      ) : (
        <div className="history">
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={onClearHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>
          <div className="history-list">
            {searchHistory.map((item) => (
              <span
                className="history-item"
                onClick={() => onClickHistory(item)}
                key={item}
              >
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage
