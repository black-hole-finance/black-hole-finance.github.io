import { LBP_INFO } from '../const'

const initState = {
  info: {
    balance: '',
    price: '',
    start_at: '',
    end_at: '',
    status: '',
  },
}

const reduces = {
  // 相关展示信息
  [LBP_INFO](state, payload) {
    return { ...state, info: payload }
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
