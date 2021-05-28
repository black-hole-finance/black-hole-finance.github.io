// react是单一store所以需要合并reducers
import { combineReducers } from 'redux'
import locale from './locale'
import popup from './popup'
import pools from './pools'
import lbp from './lbp'
import burn from './burn'
import menu from './menu'

export default combineReducers({
  locale,
  popup,
  pools,
  lbp,
  menu,
  burn,
})
