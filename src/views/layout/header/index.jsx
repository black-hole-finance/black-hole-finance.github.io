import './index.less'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LogoText from '../../../assets/image/Logo_text@2x.png'
import SmallLogo from '../../../assets/image/small_logo@2x.png'

const Header = (props) => {
  return (
    <div className='header'>
      <div className='header_box'>
        <Link to='/'>
          <img className='header_logo' src={LogoText} />
        </Link>
        {props.location.pathname.indexOf('connectWallet') === -1 &&
          props.location.pathname.indexOf('detail') === -1 && (
            <div className='header_connect_btn'>
              <img className='header_small_logo' src={SmallLogo} />
              <span className='connect_text'>
                <FormattedMessage id='header_text_1' />
              </span>
            </div>
          )}
        {props.location.pathname.indexOf('connectWallet') === -1 &&
          props.location.pathname.indexOf('detail') > -1 && (
            <div className='header_connect_btn'>
              <span className='connect_text'>
                <FormattedMessage id='header_text_2' />
              </span>
              <i className='connect_wallet'></i>
            </div>
          )}
      </div>
    </div>
  )
}

export default withRouter(Header)
