import { CHANGE_LOCALE } from '../const'

const initState = {
  locale: 'en',
}

const reduces = {
  // 更换语言
  [CHANGE_LOCALE](state, payload) {
    return { ...state, locale: payload }
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
