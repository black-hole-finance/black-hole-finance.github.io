import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import './index.less'

const ConnectWalletSuccessPopup = (props) => {
  return (
    <div className='connect_wallet_success_popup'>
      <span className='account_png'></span>
      <p>
        <FormattedMessage id='successPopup_text_1' />
        <span>{props.balance} USDT</span>
      </p>
      <div className='connect_wallet_success_popup_btn'>
        <a>
          <FormattedMessage id='successPopup_text_2' />
        </a>
        <a>
          <FormattedMessage id='successPopup_text_3' />
        </a>
      </div>
    </div>
  )
}

export default withRouter(ConnectWalletSuccessPopup)
