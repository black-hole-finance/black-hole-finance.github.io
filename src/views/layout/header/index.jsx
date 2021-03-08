import './index.less'
import Logo from '../../../assets/image/Logo@2x.png'
import SmallLogo from '../../../assets/image/small_logo@2x.png'

const Header = () => {
  return (
    <div className='header'>
      <img className='header_logo' src={Logo} />
      <div className='header_connect_btn'>
        <img className='header_small_logo' src={SmallLogo} />
        <span className='connect_text'>App Coming Soon</span>
      </div>
    </div>
  )
}

export default Header
