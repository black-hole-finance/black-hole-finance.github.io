import { FormattedMessage } from 'react-intl'
import './index.less'
import FiledPng from '../../../assets/image/popup/failed.svg'

const ChangeNetworkPopup = () => {
  return (
    <div className='change_network_popup'>
      <img src={FiledPng} />
        <div className="change_network_popup_txt">
            <p>
                <FormattedMessage id='changeNetwork_text_1' />
            </p>
            <p style={{ marginTop: '20px' }}>
                <FormattedMessage id='changeNetwork_text_2' />
            </p>
        </div>
      <a
        onClick={() => {
          window.ethereum &&
            window.ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x38',
                    chainName: 'BSC',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB',
                      decimals: 18,
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com/'],
                  },
                ],
              })
              .then(() => {
                window.location.reload()
              })
              .catch((e) => {
                window.location.reload()
              })
        }}
      >
        <FormattedMessage id='changeNetwork_text_3' />
      </a>
    </div>
  )
}

export default ChangeNetworkPopup
