import {
  CONNECT_WALLET_FAILED_FLAG,
  CONNECT_WALLET_SUCCESS_FLAG,
  CHANGE_NETWORK_FLAG,
  POPUP_LOADING_FLAG,
  HANDLE_WALLET_MODAL,
  SWITCH_NETWORK_POPUP,
  CHANGE_SLIPPAGE,
} from '../const'

const initState = {
  connectWalletFailedFlag: false,
  connectWalletSuccessFlag: false,
  changeNetworkFlag: false,
  popupLoadingFlag: false,
  walletModal: null,
  slippage: false,
  slippageVal: 10,
  slippageSuccess: false,
  switchNetworkPopup: false
}

const reduces = {
  // 非白名单用户
  [CONNECT_WALLET_FAILED_FLAG](state, payload) {
    return { ...state, connectWalletFailedFlag: payload }
  },
  // 链接成功 提示
  [CONNECT_WALLET_SUCCESS_FLAG](state, payload) {
    return { ...state, connectWalletSuccessFlag: payload }
  },
  // 链接 链错误
  [CHANGE_NETWORK_FLAG](state, payload) {
    return { ...state, changeNetworkFlag: payload }
  },
  [POPUP_LOADING_FLAG](state, payload) {
    return { ...state, popupLoadingFlag: payload }
  },
  [HANDLE_WALLET_MODAL](state, payload) {
    return { ...state, walletModal: payload }
  },
  [SWITCH_NETWORK_POPUP](state, switchNetworkPopup) {
    return {...state, switchNetworkPopup}
  },

  [CHANGE_SLIPPAGE](state, payload) {
    return { ...state, slippageVal: payload }
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
