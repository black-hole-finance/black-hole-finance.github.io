import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useActiveWeb3React } from '../../../hooks'
import globe from '../../../assets/image/burn/globe.png'
import { formatAmount } from '../../../utils/format'
import { FormattedMessage } from 'react-intl'
import { useTokenBalance } from '../../../hooks/wallet'
import { BLACK_ADDRESS } from '../../../constants'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import './index.less'

export const MenuMask = (props) => {
  const { dispatch, locale } = props
  const { active, account, chainId } = useActiveWeb3React()
  const [showMenu, setShowMenu] = useState(false)
  const wallet_amount = useTokenBalance(BLACK_ADDRESS[chainId])
  const [language, setLanguage] = useState(
    (locale === 'en' && '中文简体') || (locale === 'zh' && 'English')
  )

  useEffect(() => {
    if (locale === 'en') setLanguage('中文简体')
    if (locale === 'zh') setLanguage('English')
  }, [locale])

  const handleMenuItemClick = () => {
    setShowMenu(false)
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
    <div className='menumask'>
      <div
        className='menumask_left'
        onClick={() =>
          dispatch({
            type: 'HANDLE_SHOW_MENUMASK_MODAL',
            payload: false,
          })
        }
      ></div>
      <div className='menumask_right'>
        <nav className='menumask_nav'>
          <ul className='menumask_list'>
            <div className='menumask__menu-wrapper'>
              {active && (
                <div className='menumask_ht-balance'>
                  <span></span>
                  <p>
                    {formatAmount(wallet_amount)}{' '}
                    <FormattedMessage id='header_text_5' />
                  </p>
                </div>
              )}
            </div>

            {/*{ <li className='menumask_item'>*/}
            {/*  <NavLink*/}
            {/*    to='/burn'*/}
            {/*    className='menumask_link'*/}
            {/*    onClick={() =>*/}
            {/*      dispatch({*/}
            {/*        type: 'HANDLE_SHOW_MENUMASK_MODAL',*/}
            {/*        payload: false,*/}
            {/*      })*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <FormattedMessage id='header_text_3' />*/}
            {/*  </NavLink>*/}
            {/*</li> }*/}
            {/*<li className='menumask_item'>*/}
            {/*  <NavLink*/}
            {/*    to='/activate'*/}
            {/*    className='menumask_link'*/}
            {/*    onClick={() =>*/}
            {/*      dispatch({*/}
            {/*        type: 'HANDLE_SHOW_MENUMASK_MODAL',*/}
            {/*        payload: false,*/}
            {/*      })*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <FormattedMessage id='header_text_4' />*/}
            {/*  </NavLink>*/}
            {/*</li>*/}
          </ul>
          <div className='menumask_language'>
            {<div className='language' onClick={() => tabLanguage(language)}>
              <svg
                t='1622030905482'
                class='icon'
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
            </div>}
            <ul className='menumask_links'>
              <li>
                <a
                  title='title'
                  href='https://twitter.com/BlackHoleBurn'
                  target='_blank'
                  rel='noopener'
                >
                  <svg
                    t='1621850331615'
                    class='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='2000'
                    width='32'
                    height='32'
                  >
                    <path
                      d='M512 938.656C276.352 938.656 85.344 747.648 85.344 512S276.352 85.344 512 85.344 938.656 276.352 938.656 512 747.648 938.656 512 938.656z m256-589.344c-19.2 8.704-39.552 14.4-60.352 16.96a107.584 107.584 0 0 0 46.208-59.584 206.848 206.848 0 0 1-66.72 26.144 103.2 103.2 0 0 0-126.304-21.44c-41.984 23.04-63.584 72.128-52.672 119.616-84.48-4.352-163.2-45.248-216.512-112.512a109.344 109.344 0 0 0-14.208 54.144c0 37.344 18.528 70.304 46.72 89.6a102.752 102.752 0 0 1-47.584-13.44v1.344c0 51.232 35.264 95.392 84.256 105.568a103.264 103.264 0 0 1-47.456 1.856c13.76 43.84 53.184 73.92 98.112 74.784A207.168 207.168 0 0 1 256 676.928a291.904 291.904 0 0 0 160.992 48.416c193.248 0 298.912-164.064 298.912-306.368 0-4.64-0.128-9.312-0.32-13.888A216.416 216.416 0 0 0 768 349.344z'
                      p-id='2001'
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  title='title'
                  href='https://t.me/BlackholeProtocolOfficial'
                  target='_blank'
                  rel='noopener'
                >
                  <svg
                    t='1621850396854'
                    class='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='2134'
                    width='32'
                    height='32'
                  >
                    <path
                      d='M512 938.656C276.352 938.656 85.344 747.648 85.344 512S276.352 85.344 512 85.344 938.656 276.352 938.656 512 747.648 938.656 512 938.656zM379.296 561.92l0.576-0.32 37.12 122.464c4.768 13.28 11.328 15.68 19.328 14.56 8-1.056 12.224-5.376 17.472-10.4l50.688-48.992 108.8 80.544c19.904 10.976 34.176 5.312 39.136-18.432l70.72-333.728c7.776-31.04-5.856-43.52-29.984-33.6L277.888 494.4c-28.32 11.328-28.16 27.2-5.12 34.24l106.56 33.28v-0.032z'
                      p-id='2135'
                    ></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  title='title'
                  href='https://github.com/black-hole-finance'
                  target='_blank'
                  rel='noopener'
                >
                  <svg
                    t='1621850433941'
                    class='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='2268'
                    width='32'
                    height='32'
                  >
                    <path
                      d='M512 85.344c235.648 0 426.656 191.04 426.656 426.656 0 235.648-191.04 426.656-426.656 426.656-235.648 0-426.656-191.04-426.656-426.656C85.344 276.352 276.384 85.344 512 85.344z m177.92 171.296c-3.52-0.896-29.888-5.728-84.96 34.144a279.36 279.36 0 0 0-77.76-11.168 280.096 280.096 0 0 0-77.76 11.2c-55.104-39.904-81.536-35.072-85.056-34.176l-0.384 0.128c-16.864 45.696-6.24 79.456-3.008 87.84-19.872 23.232-32 52.832-32 89.088 0 127.168 72.512 155.648 141.504 164.032-8.896 8.32-16.96 22.944-19.744 44.384-17.696 8.48-62.656 23.136-90.368-27.584 0 0-16.416-31.904-47.584-34.24h-0.64c-4.192 0.096-27.2 1.376-1.504 20.224 0 0 20.352 10.176 34.496 48.544 0 0 18.24 59.264 104.64 39.168l0.192 33.28c0.16 25.792 19.84 46.592 43.968 46.496h66.56c24.096 0.064 43.744-20.736 43.904-46.528v-1.536-1.248l0.032-3.552v-2.368l0.064-5.92v-11.968l0.064-15.904v-20.064c0-30.976-9.92-51.136-21.056-61.44 69.12-8.224 141.824-36.288 141.824-163.776 0-36.256-12.064-65.856-32-89.088 3.232-8.352 13.856-42.112-3.04-87.84z'
                      p-id='2269'
                    ></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  title='title'
                  href='https://blackholeprotocol.medium.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    t='1621850459903'
                    class='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='2402'
                    width='32'
                    height='32'
                  >
                    <path
                      d='M512 85.344c235.648 0 426.656 191.008 426.656 426.656S747.648 938.656 512 938.656 85.344 747.648 85.344 512 276.352 85.344 512 85.344z m-91.04 213.312H271.008V300.8l38.528 53.6c8.576 8.512 10.72 21.408 10.72 32.128v235.648c2.144 12.864 0 27.84-6.4 40.704L256 742.144v2.144h154.272v-2.144l-57.856-77.12a65.984 65.984 0 0 1-6.4-40.672v-214.336c2.144 4.288 4.288 4.288 6.4 12.864l145.664 325.664h2.144l141.472-353.44c-1.696 10.24-2.048 21.888-2.112 31.648v259.712a19.52 19.52 0 0 1-6.4 14.976l-42.88 40.704v2.144h209.952v-2.144l-40.704-40.704h-0.096c-4.256-2.144-6.4-8.544-6.4-12.832V362.88c0-4.256 2.144-10.656 6.4-14.976L800.224 300.8v-2.144h-145.728l-109.216 276.416-124.32-276.416z'
                      p-id='2403'
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default connect((store) => ({
  locale: store.locale.locale,
  showMenuMaskModal: store.menu.showMenuMaskModal,
}))(withRouter(MenuMask))
