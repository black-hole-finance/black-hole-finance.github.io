import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useActiveWeb3React } from '../../../hooks'
import ConnectWalletFailedPopup from '../../components/ConnectWalletFailedPopup'
import ConnectWalletSuccessPopup from '../../components/ConnectWalletSuccessPopup'
import ChangeNetworkPopup from '../../components/ChangeNetworkPopup'
import { connectWallet } from '../../../utils'
import { injected } from '../../../connectors'

const ConnectWallet = (props) => {
  const { dispatch } = props
  const { activate } = useWeb3React()
  const { active, chainId } = useActiveWeb3React()
  console.log(props, useActiveWeb3React(), 'useActiveWeb3React')
  const [changeNetwork, setChangeNetwork] = useState(false)
  const connectWalletClick = () => {
    connectWallet(activate, injected)
      .then(() => console.log)
      .catch(() => console.log)
  }
  return (
    <>
      <div className='connect_wallet_box'>
        <div className='content'>
          <div className='connect_wallet_box_content'>
            <div>
              <h2 className='connect_wallet_box_title'>
                <FormattedMessage id='connect_wallet_text_1' />
              </h2>
              <p className='connect_wallet_box_text'>
                <FormattedMessage id='connect_wallet_text_2' />
              </p>
            </div>
            <div className='connect_wallet_box_btn'>
              <a
                onClick={() => {
                  connectWalletClick()
                }}
              >
                <FormattedMessage id='connect_wallet_text_3' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ConnectWallet)
