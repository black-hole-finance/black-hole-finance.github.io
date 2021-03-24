import './index.less'
import Medium from '../../../assets/image/footer/medium.svg'
import GitHub from '../../../assets/image/footer/github.svg'
import Telegram from '../../../assets/image/footer/telegram.svg'
import Twitter from '../../../assets/image/footer/twitter.svg'

const Footer = () => {
  return (
    <div className='footer'>
      <ul className='footer_links'>
        <li>
          <a href='https://t.me/blackhole' target='_blank'>
            <img src={Telegram} />
          </a>
        </li>
        <li>
          <a href='https://twitter.com/blackhole' target='_blank'>
            <img src={Twitter} />
          </a>
        </li>
        <li>
          <a href='https://github.com/blackhole' target='_blank'>
            <img src={GitHub} />
          </a>
        </li>
        <li>
          <a href='https://www.blackhole.black' target='_blank'>
            <img src={Medium} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Footer
