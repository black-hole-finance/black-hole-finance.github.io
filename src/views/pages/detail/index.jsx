import React, { useContext, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'
import cs from 'classnames'
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
        0x4F7d4aCF1A2d92C5b64a7365e3cD214aCF1A2d92C5b
        <CopyToClipboard
          text='0x4F7d4aCF1A2d92C5b64a7365e3cD214aCF1A2d92C5b'
          onCopy={() => {
            message.success('copy success')
          }}
        >
          <a></a>
        </CopyToClipboard>
      </p>
      <p className='detail_banner_withdraw_tip'>
        This is a smart contract address, please do not transfer any token into
        it.
      </p>
      <div className='detail_card'>
        <div className='detail_card_content'>
          <div className='detail_card_logo_title'>
            <p className='detail_card_logo'>
              <img src={SmallLogoText} />
            </p>
            <p className='detail_card_logo_text'>Seed Round</p>
          </div>
          <div className='detail_card_content_title'>
            <span>Swap Amount</span>
            <span>My Quota</span>
          </div>

          <div className='detail_card_content_title detail_card_val'>
            <span>600,000BLACK</span>
            <span>XXXXXU</span>
          </div>
          <div className='detail_card_content_title detail_card_swap_progress'>
            <span>Swap Progress</span>
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
            <span>300,000/600,000 BLACK</span>
          </div>
        </div>
      </div>
      <div className='detail_btn_box'>
        {/* detail_btn_disable */}
        <a className={'detail_btn detail_btn_active'} onClick={() => {}}>
          Jion Pool
        </a>
        <a
          className='detail_btn'
          href={`https://hecoinfo.com/address/0x4F7d4aCF1A2d92C5b64a7365e3cD214aCF1A2d92C5b`}
          target='_blank'
        >
          View Heco
        </a>
      </div>
      <div className='detail_tip'>
        Sorry, you are not eligable for this project since you are not involved
        in the whitelist.
      </div>
      <div className='detail_content'>
        <div className='detail_content_tab'>
          <a
            onClick={() => setDetailTab('detail')}
            className={cs(detailTab === 'detail' && 'active')}
          >
            Pool Details
          </a>
          <a
            onClick={() => setDetailTab('project')}
            className={cs(detailTab === 'project' && 'active')}
          >
            About the Project
          </a>
        </div>
        {detailTab === 'detail' && (
          <div className='detail_table_box'>
            <table className='detail_table pools-detail_table__left'>
              <thead>
                <tr>
                  <th>Pool Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <span>Token Distribution</span>
                      <span>February 27th 2021, 9:30PM SGT</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>Allocation(Min)-Allocation(Max)</span>
                      <span>0-XXX USDT</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>Min Swap Level</span>
                      <span>XXXXX USDT</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='detail_table pools-detail_table__right'>
              <thead>
                <tr>
                  <th>Token Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <span>Name</span>
                      <span>Black Hole</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>Address</span>
                      <span>0x4F7d4aCF1A2d92C5b64a7365e3cD214aCF1A2d92C5b</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span>Total Supply</span>
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
              BlackHole-protocol is License-free Decentralized Token Burning
              Protocol, the Blockchain Ecosystem Reconfigurator for Permanent
              Deflation
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
