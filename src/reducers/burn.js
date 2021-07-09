import { BURN_INFO } from '../const'
import burnBlack from '../assets/image/icon/burnBlack.png'
import burnHTmoon from '../assets/image/icon/burnHTmoon.png'
import burnWAR from '../assets/image/icon/burnWAR.png'
const initState = {
  pools: [{
    poolTitle: 'BlackHole',
    begin: 1625832000,
    periodFinish: 1627041600, // 结束时间
    rewards: 0,// 大家的总奖励
    rewardsTotal: 50000,//池子总奖励
    balanceOf: 0,
    totalSupply: 0,
    earned: 0,
    stakingToken: '0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2',
    stakingTokenSymbol: 'BLACK',
    stakingIcon: burnBlack,
    rewardsToken: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0',
    rewardsTokenSymbol: 'WAR',
    rewardsTokenIcon: burnWAR,
    address: '0xD3926cbfE988CaCCED3962273E0cA915525954Ec',// 授权 燃烧 提取

  }],
}

// SHIB  0xaF90E457f4359adCC8b37E8dF8a27a1fF4c3F561
// BLACK  0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2

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
