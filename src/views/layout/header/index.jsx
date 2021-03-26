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

const Header = (props) => {
  const { token_symbol } = props.connectPools
  const { active, chainId, account } = useActiveWeb3React()
  return (
    <div className='header'>
      <div className='header_box'>
        <Link to='/'>
          <img className='header_logo' src={LogoText} />
        </Link>
        {!active && (
          <div className='header_connect_btn'>
            <img className='header_small_logo' src={SmallLogo} />
            <span className='connect_text'>
              <FormattedMessage id='header_text_1' />
            </span>
          </div>
        )}
        {active && (
          <div className='header_connect_btn'>
            <span className='connect_text balance_text'>
              {props.balance} {token_symbol}
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
