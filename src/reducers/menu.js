import {
  HANDLE_SHOW_MENUMASK_MODAL,
} from '../const'

const initState = {
  showMenuMaskModal: false,
}

const reduces = {
  // 非白名单用户
  [HANDLE_SHOW_MENUMASK_MODAL](state, payload) {
    return { ...state, showMenuMaskModal: payload }
  },
}

export default (state = initState, action) => {
  let { type, payload } = action
  if (reduces[type]) {
    return reduces[type](state, payload)
  } else {
    return state
  }
}
