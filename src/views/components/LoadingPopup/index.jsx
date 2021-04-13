import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Spin, Alert } from 'antd'
import './index.less'
import FiledPng from '../../../assets/image/popup/failed.svg'

const ConnectWalletFailedPopup = () => {
  return (
    <div className='connect_wallet_failed_popup'>
      <img src={FiledPng} />
      <Spin tip='Loading...'></Spin>
    </div>
  )
}

export default ConnectWalletFailedPopup
