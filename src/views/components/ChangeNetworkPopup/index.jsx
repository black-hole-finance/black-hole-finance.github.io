import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import FiledPng from '../../../assets/image/popup/failed.svg'

const ChangeNetworkPopup = () => {
  return (
    <div className='change_network_popup'>
      <img src={FiledPng} />
      <p>
        <FormattedMessage id='changeNetwork_text_1' />
      </p>
      <p style={{ marginTop: '20px' }}>
        <FormattedMessage id='changeNetwork_text_2' />
      </p>
    </div>
  )
}

export default ChangeNetworkPopup
