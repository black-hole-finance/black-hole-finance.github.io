import React, { useEffect, useState } from 'react'
import './index.less'
import { withRouter } from 'react-router'
import { useActiveWeb3React } from '../../../hooks'
import ConnectWalletFailedPopup from '../../components/ConnectWalletFailedPopup'
import ConnectWalletSuccessPopup from '../../components/ConnectWalletSuccessPopup'
import ChangeNetworkPopup from '../../components/ChangeNetworkPopup'
import LoadingPopup from '../../components/LoadingPopup'
import { connect } from 'react-redux'

const InitPage = (props) => {
  const { dispatch } = props
  const { token_allocation, currency_allocation } = props.connectPools
  const { active, chainId, account } = useActiveWeb3React()
  useEffect(() => {
    dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
    // 如果链接钱包成功后，不是白名单情况 && 在 connectWallet 页面时，弹框提示
    if (
      active &&
      currency_allocation - 0 == 0 &&
      currency_allocation.length > 0 &&
      props.location.pathname === '/investment'
    ) {
      dispatch({ type: 'CONNECT_WALLET_FAILED_FLAG', payload: true })
    } else {
      dispatch({ type: 'CONNECT_WALLET_FAILED_FLAG', payload: false })
    }

    // 如果链接钱包成功后，在 connectWallet 页面时，展示余额信息 弹框提示
    if (
      active &&
      currency_allocation - 0 !== 0 &&
      token_allocation == 0 &&
      props.location.pathname === '/investment'
    ) {
      dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: true })
    } else {
      dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: false })
    }
  }, [
    active,
    token_allocation,
    props.popupLoadingFlag,
    currency_allocation,
    props.location,
  ])

  return (
    <>
      {/*loading */}
      {active && props.popupLoadingFlag && props.location.pathname !== '/' && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <LoadingPopup />
          </div>
        </div>
      )}
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
            <ConnectWalletSuccessPopup />
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
  popupLoadingFlag: store.popup.popupLoadingFlag,
}))(withRouter(InitPage))
