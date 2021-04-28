import './index.less'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useActiveWeb3React } from '../../../hooks'
import { message } from 'antd'
import LogoText from '../../../assets/image/Logo_text@2x.png'
import SmallLogo from '../../../assets/image/small_logo@2x.png'
import { formatAmount } from '../../../utils/format'
import {connectWallet} from "../../../utils";
import {injected} from "../../../connectors";

const Header = (props) => {
  const { token_symbol, wallet_amount } = props.connectPools
  const { active, chainId, account, activate, deactivate } = useActiveWeb3React()
  console.log(props.location.pathname)

  const connectWalletClick = () => {
    if(props.location.pathname === '/') return
    connectWallet(activate, injected, deactivate)
      .then(() => console.log)
      .catch(() => console.log)
  }
  return (
    <div className='header'>
      <div className='header_box'>
        <Link to='/'>
          <img className='header_logo' src={LogoText} />
        </Link>
        {(!active) && (
          <div className='header_connect_btn' onClick={connectWalletClick}>
            <img className='header_small_logo' src={SmallLogo} />
            <span className='connect_text'>
              {
                props.location.pathname === '/' ? <FormattedMessage id='header_text_1' /> : <FormattedMessage id='header_text_2' />
              }

            </span>
          </div>
        )}
        {active && props.location.pathname !== '/' && (
          <div className='header_connect_btn'>
            <span className='connect_text balance_text'>
              {formatAmount(wallet_amount)} {token_symbol}
            </span>
            <span className='balance_line'></span>
            <span className='connect_text balance_text'>{account}</span>
            <CopyToClipboard
              text={account}
              onCopy={() => {
                message.success('copy success')
              }}
            >
              <a className='connect_wallet'></a>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(Header))
