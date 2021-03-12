import React, { useContext, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import SmallLogoText from '../../../assets/image/small_logo_text@2x.png'
import chromeLine from '../../../assets/image/footer/chromeLine@2x.png'
import GitHub from '../../../assets/image/footer/github@2x.png'
import Telegram from '../../../assets/image/footer/telegram@2x.png'
import Twitter from '../../../assets/image/footer/twitter@2x.png'
import './index.less'

const Detail = () => {
  const [detailTab, setDetailTab] = useState('detail')

  return (
    <div className='detail'>
      <h3 className='detail_banner_text'>Black Hole</h3>
      <p className='detail_banner_dec'>
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        <CopyToClipboard
          text='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
          onCopy={() => {
            message.success('copy success')
          }}
        >
          <a></a>
        </CopyToClipboard>
      </p>
      <p className='detail_banner_withdraw_tip'>
        <FormattedMessage id='detail_text_1' />
      </p>
      <div className='detail_card'>
        <div className='detail_card_content'>
          <div className='detail_card_logo_title'>
            <p className='detail_card_logo'>
              <img src={SmallLogoText} />
            </p>
            <p className='detail_card_logo_text'>
              <FormattedMessage id='detail_text_2' />
            </p>
          </div>
          <div className='detail_card_content_title'>
            <span>
              <FormattedMessage id='detail_text_3' />
            </span>
            <span>
              <FormattedMessage id='detail_text_4' />
            </span>
          </div>

          <div className='detail_card_content_title detail_card_val'>
            <span>600,000BLACK</span>
            <span>XXXXXU</span>
          </div>
          <div className='detail_card_content_title detail_card_swap_progress'>
            <span>
              <FormattedMessage id='detail_text_5' />
            </span>
          </div>
          <div className='detail_card_progress__bar'>
            <p>
              <a
                style={{
                  width: '50%',
                }}
              ></a>
            </p>
          </div>
          <div className='detail_card_content_title detail_card_schedule'>
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          <div className='detail_card_content_title detail_card_val detail_card_total_val'>
            <span className='detail_card_bottom_val'>
              300,000/600,000 BLACK
            </span>
          </div>
        </div>
      </div>
      <div className='detail_btn_box'>
        {/* detail_btn_disable */}
        <a className={'detail_btn detail_btn_active'} onClick={() => {}}>
          <FormattedMessage id='detail_text_6' />
        </a>
        <a
          className='detail_btn'
          href={`https://hecoinfo.com/address/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`}
          target='_blank'
        >
          <FormattedMessage id='detail_text_7' />
        </a>
      </div>
      <div className='detail_tip'>
        <FormattedMessage id='detail_text_8' />
      </div>
      <div className='detail_content'>
        <div className='detail_content_tab'>
          <a
            onClick={() => setDetailTab('detail')}
            className={cs(detailTab === 'detail' && 'active')}
          >
            <FormattedMessage id='detail_text_9' />
          </a>
          <a
            onClick={() => setDetailTab('project')}
            className={cs(detailTab === 'project' && 'active')}
          >
            <FormattedMessage id='detail_text_10' />
          </a>
        </div>
        {detailTab === 'detail' && (
          <div className='detail_table_box'>
            <table className='detail_table pools-detail_table__left'>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id='detail_text_11' />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <span>
                        <FormattedMessage id='detail_text_12' />
                      </span>
                      <span>February 27th 2021, 9:30PM SGT</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>
                        <FormattedMessage id='detail_text_13' />
                      </span>
                      <span>0-XXX USDT</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>
                        <FormattedMessage id='detail_text_14' />
                      </span>
                      <span>XXXXX USDT</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='detail_table pools-detail_table__right'>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id='detail_text_15' />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <span>
                        <FormattedMessage id='detail_text_16' />
                      </span>
                      <span>Black Hole</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>
                        <FormattedMessage id='detail_text_17' />
                      </span>
                      <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>
                        <FormattedMessage id='detail_text_18' />
                      </span>
                      <span>100,000,000.00</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {detailTab === 'project' && (
          <div className='detail_content_link'>
            <a href='https://blackhole.finance' target='_blank'>
              <img src={chromeLine} />
              https://blackhole.finance
            </a>
            <a href='https://twitter.com/blackhole' target='_blank'>
              <img src={Twitter} />
              https://twitter.com/blackhole
            </a>
            <a href='https://t.me/blackhole' target='_blank'>
              <img src={Telegram} />
              https://t.me/blackhole
            </a>
            <a href='https://github.com/blackhole' target='_blank'>
              <img src={GitHub} />
              https://github.com/blackhole
            </a>
            <a className='no_link'>
              <FormattedMessage id='detail_text_19' />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
