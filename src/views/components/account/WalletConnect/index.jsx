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
import './index.less'

const WalletConnect = (props) => {
  const {
    active,
    chainId,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const { dispatch, changeNetworkFlag } = props

  useEffect(() => {
    window.document.getElementById('container').style.display = 'none'
  }, [])

  const connectMetamaskWalletClick = () => {
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
    <div className='wallet-connect'>
      <div
        onClick={connectMetamaskWalletClick}
        className='wallet-connect_metamask'
      >
        <img src={metamask} />
        <p>
          <FormattedMessage id='accountText8' />
        </p>
      </div>

      <div onClick={connectWalletClick} className='wallet-connect_metamask'>
        <img src={walletConnect} />
        <p>
          <FormattedMessage id='accountText9' />
        </p>
      </div>
    </div>
  )
}

export default connect((store) => ({
  changeNetworkFlag: store.popup.changeNetworkFlag,
}))(withRouter(WalletConnect))
