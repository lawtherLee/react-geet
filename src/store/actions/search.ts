import { removeLocalHistories } from './../../utils/storage'
import { Suggestion } from './../../types/data.d'
import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { RootThunkAction, SearchAction } from '@/types/store'
export const getSuggestion = (q: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<
      AxiosResponse<{
        options: Suggestion
      }>
    >('suggestion', {
      params: {
        q,
      },
    })
    dispatch({
      type: 'search/getSuggestion',
      payload: res.data.data.options,
    })
  }
}

// 存储搜索历史
export const saveHistory = (payload: string): SearchAction => {
  return {
    type: 'search/saveHistory',
    payload,
  }
}

// 清空搜索历史
export const clearHistory = (): SearchAction => {
  removeLocalHistories()
  return {
    type: 'search/clearHistory',
  }
}

// 获取搜索结果
export const getSearchResults = (
  key: string,
  page: number
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('search', {
      params: {
        q: key,
        page,
        per_page: 10,
      },
    })
    dispatch({
      type: 'search/getSearchResults',
      payload: res.data.data.results,
    })
  }
}
