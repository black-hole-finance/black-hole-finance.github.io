import React, { useContext, useEffect, useState } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../../hooks'
import { FormattedMessage } from 'react-intl'
import { connectWallet } from '../../../../utils'
import { injected, walletChange } from '../../../../connectors'
import metamask from '../../../../assets/image/icon/metamask.png'
import walletConnect from '../../../../assets/image/icon/walletConnect.png'
import close from '../../../../assets/image/icon/close.png'
import back from '../../../../assets/image/icon/back.png'
import { message } from 'antd'
import './index.less'

const WalletChangePopup = (props) => {
  const {
    active,
    chainId,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const { dispatch } = props

  const connectMetamaskWalletClick = () => {
    console.log(111111)
    connectWallet(activate, injected, deactivate)
      .then(() => console.log)
      .catch(() => console.log)
  }

  const connectWalletClick = () => {
    connectWallet(activate, walletChange, deactivate)
      .then(() => {
        // 验证之后弹 connectWallet 弹框
      })
      .catch(() => console.log)
  }

  return (
    <div className='wallet_change_popup'>
      <div
        className='wallet_change_popup_header'
        style={{ maxWidth: 'inherit' }}
      >
        <img
          src={back}
          alt=''
          className='wallet_change_popup_close-btn_back'
          onClick={() => {
            dispatch({
              type: 'HANDLE_WALLET_MODAL',
              payload: 'smallWalletConnect',
            })
          }}
        />
        <img
          src={close}
          alt=''
          className='wallet_change_popup_close-btn'
          onClick={() => {
            dispatch({
              type: 'HANDLE_WALLET_MODAL',
              payload: null,
            })
          }}
        />
      </div>

      <div
        className='wallet_change_popup_frame'
        onClick={connectMetamaskWalletClick}
        style={{ marginBottom: 24 }}
      >
        {active && account && (
          <p className='account'>
            <a className='wallet_change_popup_frame_dot' />
            {account}
          </p>
        )}
        {!active && (
          <p>
            <FormattedMessage id='accountText6' />
          </p>
        )}
        <img src={metamask} alt='' />
      </div>

      <div className='wallet_change_popup_frame' onClick={connectWalletClick}>
        <p>
          <FormattedMessage id='accountText7' />
        </p>
        <img src={walletConnect} alt='' />
      </div>
    </div>
  )
}

export default connect((store) => ({
  changeNetworkFlag: store.popup.changeNetworkFlag,
}))(withRouter(WalletChangePopup))
