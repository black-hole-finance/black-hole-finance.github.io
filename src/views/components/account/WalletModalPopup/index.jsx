import React, { useContext, useEffect, useState } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../../hooks'
import { FormattedMessage } from 'react-intl'
import { connectWallet } from '../../../../utils'
import { injected, walletChange } from '../../../../connectors'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import copy from '../../../../assets/image/icon/copy.png'
import switchIcon from '../../../../assets/image/icon/switch.png'
import close from '../../../../assets/image/icon/close.png'
import { message } from 'antd'
import './index.less'

const WalletModalPopup = (props) => {
  const {
    active,
    chainId,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const { dispatch } = props

  useEffect(() => {
    // window.document.getElementById('container').style.display = 'none'
  }, [])

  return (
    <div className='wallet_modal_popup'>
      <div
        className='wallet_modal_popup_header'
        style={{ maxWidth: 'inherit' }}
      >
        <FormattedMessage id='modalsText59' />
        <img
          src={close}
          alt=''
          className='wallet_modal_popup_close-btn'
          onClick={() => {
            dispatch({
              type: 'HANDLE_WALLET_MODAL',
              payload: null,
            })
          }}
        />
      </div>
      <span className='wallet_modal_popup_address'>{account}</span>

      <CopyToClipboard
        text={account}
        onCopy={() => {
          message.success('copy success')
        }}
      >
        <div className='wallet_modal_popup_frame' style={{ marginBottom: 24 }}>
          <img src={copy} alt='' />
          <p>
            <FormattedMessage id='modalsText60' />
          </p>
        </div>
      </CopyToClipboard>

      <div
        className='wallet_modal_popup_frame'
        onClick={() => {
          dispatch({
            type: 'HANDLE_WALLET_MODAL',
            payload: 'changeWalletConnect',
          })
        }}
      >
        <img src={switchIcon} alt='' />
        <p>
          <FormattedMessage id='modalsText61' />
        </p>
      </div>

      <a
        className='wallet_modal_popup_btn'
        onClick={() => {
          deactivate()
          dispatch({
            type: 'HANDLE_WALLET_MODAL',
            payload: null,
          })
        }}
      >
        <FormattedMessage id='modalsText62' />
      </a>
    </div>
  )
}

export default connect((store) => ({
  changeNetworkFlag: store.popup.changeNetworkFlag,
}))(withRouter(WalletModalPopup))
