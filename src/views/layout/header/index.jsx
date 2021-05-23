import './index.less'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useActiveWeb3React } from '../../../hooks'
import { message } from 'antd'
import LogoText from '../../../assets/image/Logo_text@2x.png'
import SmallLogo from '../../../assets/image/small_logo@2x.png'
import { formatAmount } from '../../../utils/format'
import { connectWallet } from '../../../utils'
import { injected } from '../../../connectors'
import { useTokenBalance } from '../../../hooks/wallet'
import { BLACK_ADDRESS } from '../../../constants'

const Header = (props) => {
  const {
    active,
    chainId,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const { dispatch } = props
  const wallet_amount = useTokenBalance(BLACK_ADDRESS[chainId])

  const connectWalletClick = () => {
    if (props.location.pathname === '/') return
    connectWallet(activate, injected, deactivate)
      .then(() => console.log)
      .catch(() => console.log)
  }
  return (
    <div className='header'>
      <div className='header_box'>
        <div className='header_link'>
          <Link to='/'>
            <img className='header_logo' src={LogoText} />
          </Link>
          <div className='header_link_nav'>
            <Link
              to='/burn'
              className={cs(
                props.location.pathname.indexOf('burn') > -1 && 'active'
              )}
            >
              BURN
            </Link>
            <Link
              className={cs(
                props.location.pathname.indexOf('activate') > -1 && 'active'
              )}
              to='/activate'
            >
              Airdrop
            </Link>
          </div>
        </div>

        {!active && props.location.pathname !== '/' && (
          <div className='header_connect_btn' onClick={connectWalletClick}>
            <img className='header_small_logo' src={SmallLogo} />
            <span className='connect_text'>
              {<FormattedMessage id='header_text_2' />}
            </span>
          </div>
        )}
        {props.location.pathname === '/' && (
          <div className='header_btn_warpper'>
            <div className='header_connect_btn' onClick={connectWalletClick}>
              <img className='header_small_logo' src={SmallLogo} />
              <span className='connect_text'>
                {<FormattedMessage id='header_text_1' />}
              </span>
            </div>
          </div>
        )}
        {active && props.location.pathname !== '/' && (
          <div className='header_connect_btn'>
            <span className='connect_text'>
              {formatAmount(wallet_amount)} BLACK
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

        <a
          className='more'
          onClick={() => {
            dispatch({ type: 'HANDLE_SHOW_MENUMASK_MODAL', payload: true })
          }}
        ></a>
      </div>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
  showMenuMaskModal: store.menu.showMenuMaskModal,
}))(withRouter(Header))
