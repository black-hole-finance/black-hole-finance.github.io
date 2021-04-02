import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import FiledPng from '../../../assets/image/popup/failed.svg'

const ConnectWalletFailedPopup = () => {
  return (
    <div className='connect_wallet_failed_popup'>
      <img src={FiledPng} />
      <p>
        <FormattedMessage id='failePopup_text_1' />
      </p>
    </div>
  )
}

export default ConnectWalletFailedPopup
