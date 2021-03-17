import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { useActiveWeb3React } from '../../../hooks'
import ConnectWalletFailedPopup from '../../components/ConnectWalletFailedPopup'
import ConnectWalletSuccessPopup from '../../components/ConnectWalletSuccessPopup'

const ConnectWallet = () => {
  const { active, chainId } = useActiveWeb3React()
  const connectWalletClick = () => {}
  return (
    <>
      {!active && (
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
                  onClick={(e) => {
                    connectWalletClick(e)
                  }}
                >
                  <FormattedMessage id='connect_wallet_text_3' />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <ConnectWalletFailedPopup /> */}
      {/* <ConnectWalletSuccessPopup /> */}
    </>
  )
}

export default ConnectWallet
