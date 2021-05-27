import React, { useEffect, useState } from 'react'
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
import globe from '../../../assets/image/burn/globe.png'

const Header = (props) => {
  const {
    active,
    chainId,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const { dispatch, locale } = props
  const wallet_amount = useTokenBalance(BLACK_ADDRESS[chainId])
  const [language, setLanguage] = useState(
    (locale === 'en' && '中文简体') || (locale === 'zh' && 'English')
  )

  useEffect(() => {
    if (locale === 'en') setLanguage('中文简体')
    if (locale === 'zh') setLanguage('English')
  }, [locale])

  const connectWalletClick = () => {
    // if (props.location.pathname === '/') return
    connectWallet(activate, injected, deactivate)
      .then(() => console.log)
      .catch(() => console.log)
  }

  const tabLanguage = (val) => {
    val = val === 'English' ? 'en' : 'zh'
    if (val === 'en') setLanguage('English')
    if (val === 'zh') setLanguage('中文简体')
    dispatch({
      type: 'CHANGE_LOCALE',
      payload: val,
    })
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
              <FormattedMessage id='header_text_3' />
            </Link>
            <Link
              className={cs(
                props.location.pathname.indexOf('activate') > -1 && 'active'
              )}
              to='/activate'
            >
              <FormattedMessage id='header_text_4' />
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div className='language' onClick={() => tabLanguage(language)}>
            <svg
              t='1622030905482'
              className='icon'
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='1145'
              width='20'
              height='20'
            >
              <path
                d='M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m-97.706667-99.541334A763.733333 763.733333 0 0 1 342.485333 554.666667H173.312a341.674667 341.674667 0 0 0 240.981333 284.458666zM427.946667 554.666667c6.442667 104.064 36.181333 201.813333 84.053333 288.085333A678.613333 678.613333 0 0 0 596.053333 554.666667h-168.106666z m422.741333 0h-169.173333a763.733333 763.733333 0 0 1-71.808 284.458666A341.674667 341.674667 0 0 0 850.688 554.666667zM173.312 469.333333h169.173333A763.733333 763.733333 0 0 1 414.293333 184.874667 341.674667 341.674667 0 0 0 173.312 469.333333z m254.677333 0h168.021334A678.613333 678.613333 0 0 0 512 181.248 678.613333 678.613333 0 0 0 427.946667 469.333333h0.042666z m181.717334-284.458666A763.733333 763.733333 0 0 1 681.514667 469.333333h169.173333a341.674667 341.674667 0 0 0-240.981333-284.458666z'
                p-id='1146'
              ></path>
            </svg>
            {language === '中文简体' ? '中文简体' : 'English'}
          </div>
          {!active && (
            <div className='header_connect_btn' onClick={connectWalletClick}>
              <img className='header_small_logo' src={SmallLogo} />
              <span className='connect_text'>
                {<FormattedMessage id='header_text_2' />}
              </span>
            </div>
          )}
          {/* {props.location.pathname === '/' && (
            <div className='header_btn_warpper'>
              <div className='header_connect_btn' onClick={connectWalletClick}>
                <img className='header_small_logo' src={SmallLogo} />
                <span className='connect_text'>
                  {<FormattedMessage id='header_text_1' />}
                </span>
              </div>
            </div>
          )} */}
          {active && (
            <div className='header_connect_btn'>
              <div className='header_connect_wallet'>
                <span className='connect_text'>
                  {formatAmount(wallet_amount)}{' '}
                  <FormattedMessage id='header_text_5' />
                </span>
                <span className='balance_line'></span>
              </div>
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
    </div>
  )
}

export default connect((store) => ({
  locale: store.locale.locale,
  connectPools: store.pools.connectPools,
  showMenuMaskModal: store.menu.showMenuMaskModal,
}))(withRouter(Header))
