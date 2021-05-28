import { BURN_INFO } from '../const'

const initState = {
  info: {
    name: 'BLACKHole Burning',
    begin: 0,
    periodFinish: 0, // 结束时间
    rewards: 0,
    balanceOf: 0,
    totalSupply: 0,
    earned: 0,
    rewardsToken: null,
    stakingToken: '0xaF90E457f4359adCC8b37E8dF8a27a1fF4c3F561',
    SHIB_BLACK_Address: '0xe43611A0dE96e3BE22131c4F90d02613aAF50B8e',
  },
}

const reduces = {
  // 相关展示信息
  [BURN_INFO](state, payload) {
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
