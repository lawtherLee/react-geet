import { SearchAction } from '@/types/store'
import { Suggestion } from './../../types/data.d'
type stateType = {
  suggestions: Suggestion
}
const initState: stateType = {
  suggestions: [],
}
const search = (state = initState, actions: SearchAction) => {
  if (actions.type === 'search/getSuggestion') {
    return {
      ...state,
      suggestions: actions.payload,
    }
  }
  return state
}
export default search
