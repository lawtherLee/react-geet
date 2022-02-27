import { Suggestion } from './../../types/data.d'
import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { RootThunkAction } from '@/types/store'
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
