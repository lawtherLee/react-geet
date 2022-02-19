import { profile } from './profile'
import { combineReducers } from 'redux'

import { login } from './login'

const rootReducer = combineReducers({
  login,
  profile,
})

export default rootReducer
