import { LBP_INFO } from '../const'

const initState = {
  info: {
    name: 'BLACK LBP',
    balance: '0',
    price: '',
    start_at: '1619614800',
    end_at: '1619701200',
    status: '0',
    ratio: '', // 兑换比例需要确认
    currency: {
      address: '0x0', // 如果是0x0则是ht
      decimal: 18,
      symbol: 'ETH',
    },
    underlying: {
      symbol: 'BLACK',
    },
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
