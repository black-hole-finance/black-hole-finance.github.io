import React, { useEffect } from 'react'
import './index.less'
import { withRouter } from 'react-router'
import { useActiveWeb3React } from '../../../hooks'
import ConnectWalletFailedPopup from '../../components/ConnectWalletFailedPopup'
import ConnectWalletSuccessPopup from '../../components/ConnectWalletSuccessPopup'
import ChangeNetworkPopup from '../../components/ChangeNetworkPopup'
import { connect } from 'react-redux'

const InitPage = (props) => {
  const { dispatch } = props
  const { quota, token_allocation } = props.connectPools
  const { active, chainId } = useActiveWeb3React()
  useEffect(() => {
    dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
    // 如果链接钱包成功后，不是白名单情况 && 在 connectWallet 页面时，弹框提示
    if (active && props.location.pathname.indexOf('connectWallet') > -1) {
      dispatch({ type: 'CONNECT_WALLET_FAILED_FLAG', payload: true })
    } else {
      dispatch({ type: 'CONNECT_WALLET_FAILED_FLAG', payload: false })
    }
    // 如果链接钱包成功后，在 connectWallet 页面时，展示余额信息 弹框提示
    if (active && token_allocation == 0 && props.location.pathname !== '/') {
      dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: true })
    } else {
      dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: false })
    }
  }, [active, token_allocation, props.location])

  return (
    <>
      {/* 连接错误弹框 */}
      {props.changeNetworkFlag && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <ChangeNetworkPopup />
          </div>
        </div>
      )}

      {/* 登录成功后判断用户是否是白名单 */}
      {props.connectWalletFailedFlag && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <ConnectWalletFailedPopup />
          </div>
        </div>
      )}

      {/* 登录后弹框展示🐟额 */}
      {props.connectWalletSuccessFlag && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <ConnectWalletSuccessPopup balance={quota} />
          </div>
        </div>
      )}
    </>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
  changeNetworkFlag: store.popup.changeNetworkFlag,
  connectWalletFailedFlag: store.popup.connectWalletFailedFlag,
  connectWalletSuccessFlag: store.popup.connectWalletSuccessFlag,
}))(withRouter(InitPage))
