import { setLocalHistories, getLocalHistories } from './../../utils/storage'
import { SearchAction } from '@/types/store'
import { Suggestion, SearchResults } from './../../types/data.d'
type stateType = {
  suggestions: Suggestion
  history: string[]
  searchResults: SearchResults[]
}
const initState: stateType = {
  suggestions: [],
  history: getLocalHistories() || [],
  searchResults: [],
}
const search = (state = initState, actions: SearchAction) => {
  if (actions.type === 'search/getSuggestion') {
    return {
      ...state,
      suggestions: actions.payload,
    }
  }

  if (actions.type === 'search/saveHistory') {
    console.log('存储搜索历史', actions.payload)
    // 存储搜索历史的逻辑
    let newHistory = [...state.history]
    const findItem = newHistory.indexOf(actions.payload)
    if (findItem !== -1) {
      newHistory.splice(findItem, 1)
    }
    newHistory.unshift(actions.payload)
    // newHistory = [...new Set(newHistory) as string[] )]
    // 1. 如果有要存储的这一项,先删在存, 也可以先存在去重
    // 2. 搜索历史不能超过10条
    // 3. 搜索历史存储到本地
    setLocalHistories(newHistory)
    return {
      ...state,
      history: newHistory.slice(0, 10),
    }
  }

  if (actions.type === 'search/clearHistory') {
    return {
      ...state,
      history: [],
    }
  }

  if (actions.type === 'search/getSearchResults') {
    return {
      ...state,
      searchResults: [...state.searchResults, ...actions.payload],
    }
  }
  return state
}
export default search
