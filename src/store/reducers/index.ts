import search from './search'
import { profile } from './profile'
import { combineReducers } from 'redux'

import { login } from './login'
import home from './home'

const rootReducer = combineReducers({
  login,
  profile,
  home,
  search,
})

export default rootReducer
