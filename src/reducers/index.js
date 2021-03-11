// react是单一store所以需要合并reducers
import { combineReducers } from 'redux'
import locale from './locale'

export default combineReducers({
  locale,
})
