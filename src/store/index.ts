import { createStore, applyMiddleware } from 'redux'
// 引入redux-thunk处理异步
import thunk from 'redux-thunk'
// 引入开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'
// 根reducer
import rootReducer from './reducers'
// 开启调试工具的同时并使用中间件
const middlewares = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, middlewares)

export default store
