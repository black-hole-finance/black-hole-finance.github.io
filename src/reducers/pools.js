import { CONNECT_POOLS } from '../const'

const initState = {
  connectPools: {
    name: 'BLACK',
    address: '0x6c9d4B938A119f91e7eEaCd97cB4BEd2b8F5D1af',
    currency_address: '',
    currency_symbol: 'USDT',
    currency_allocation: '100,000',
    token_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    token_symbol: 'BLACK',
    token_allocation: '100,000,000',
    cliamable_balance: '999',
    round: 'SEED',
    wallet_amount: '0',
    quota: '0', // 额度
    volume: '0',
    unlocked: '0',
    unlockCapacity: '0',
    unOffer: false, // 是否募资
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
