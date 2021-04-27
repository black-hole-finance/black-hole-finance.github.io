import { CONNECT_POOLS } from '../const'

const initState = {
  connectPools: {
    name: 'BLACK',
    address: '',
    currency_address: '',
    currency_symbol: 'USDT',
    eth_usdt: 6,
    currency_allocation: '',
    token_address: '',
    token_symbol: 'BLACK',
    token_allocation: '100,000,000',
    cliamable_balance: '999',
    round: 'Ambassador',
    wallet_amount: '0',
  },
}

const reduces = {
  // 相关展示信息
  [CONNECT_POOLS](state, payload) {
    return { ...state, connectPools: payload }
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
