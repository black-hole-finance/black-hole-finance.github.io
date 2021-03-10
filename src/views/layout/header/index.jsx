import './index.less'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import LogoText from '../../../assets/image/Logo_text@2x.png'
import SmallLogo from '../../../assets/image/small_logo@2x.png'

const Header = (props) => {
  return (
    <div className='header'>
      <div className='header_box'>
        <Link to='/'>
          <img className='header_logo' src={LogoText} />
        </Link>
        <div className='header_connect_btn'>
          <img className='header_small_logo' src={SmallLogo} />
          <span className='connect_text'>App Coming Soon</span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
