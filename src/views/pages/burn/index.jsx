import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import { useWeb3React } from '@web3-react/core'
import { connectWallet } from '../../../utils'
import { Button, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { injected } from '../../../connectors'
import OLD from '../../../assets/image/burn/old@2x.png'
import NEW from '../../../assets/image/burn/new@2x.png'
import comingSoon from '../../../assets/image/burn/comingSoon@2x.png'

const Burn = (props) => {
  const { dispatch } = props
  const { activate, deactivate } = useWeb3React()
  const [amount, setAmount] = useState(1)
  const [loadFlag, setLoadFlag] = useState(false)
  const [approve, setApprove] = useState(false)

  useEffect(() => {
    window.document.getElementById('container').style.display = 'none'
  }, [])

  const onChange = (e) => {
    const { value } = e.target
    const re = /^[0-9]+([.|,][0-9]+)?$/g
    if (
      value === '' ||
      re.test(value) ||
      (value.split('.').length === 2 && value.slice(value.length - 1) === '.')
    ) {
      setAmount(value)
    }
  }

  const onMax = () => {}

  const addToken = async () => {
    try {
      let addTokenClick = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x0',
            symbol: 'WAR',
            decimals: 18,
            image: '',
          },
        },
      })
      if (addTokenClick) {
        message.success('add success')
      }
    } catch (err) {
      console.log(err, 'addToken')
    }
  }

  const onApprove = (e) => {}

  return (
    <>
      <div className='burn_box'>
        <div className='content'>
          <h2 className='burn_box_title'>BlackHole Burn</h2>
          <p className='burn_box_content'>
            毁灭的意义，是为了重建，与新生，这就是生命哲学里面的「螺旋上升，或大起大落」的时间曲线，巨大的伤害，会让你粉身碎骨，但是，「我相信最为精彩的应该是，重建之时的信心，与勇气。」
          </p>
          <div className='burn_box_card_box'>
            <div className='burn_box_card'>
              <img className='burn_box_card_old_logo' src={OLD} />
              <img className='burn_box_card_new_logo' src={NEW} />
              <h3 className='burn_box_card_title'>BlackHole Burning</h3>
              <div className='burn_box_card_countdown'>
                <div className='burn_box_card_day'>
                  <span className='burn_box_card_countdown_title'>DAYS</span>
                  <p className='burn_box_card_countdown_time'>
                    <span className='burn_box_card_time'>1</span>
                    <span className='burn_box_card_time'>2</span>
                  </p>
                </div>
                <span className='delimiter'>:</span>
                <div className='burn_box_card_day'>
                  <span className='burn_box_card_countdown_title'>HOURS</span>
                  <p className='burn_box_card_countdown_time'>
                    <span className='burn_box_card_time'>1</span>
                    <span className='burn_box_card_time'>2</span>
                  </p>
                </div>
                <span className='delimiter'>:</span>

                <div className='burn_box_card_day'>
                  <span className='burn_box_card_countdown_title'>MINUTES</span>
                  <p className='burn_box_card_countdown_time'>
                    <span className='burn_box_card_time'>1</span>
                    <span className='burn_box_card_time'>2</span>
                  </p>
                </div>
                <span className='delimiter'>:</span>

                <div className='burn_box_card_day'>
                  <span className='burn_box_card_countdown_title'>SECONDS</span>
                  <p className='burn_box_card_countdown_time'>
                    <span className='burn_box_card_time'>1</span>
                    <span className='burn_box_card_time'>2</span>
                  </p>
                </div>
              </div>
              <div className='burn_box_card_progress'>
                <p>Progress(20.12%)</p>
                <p>
                  999,999.99<span>/1,000,000</span>
                </p>
              </div>
              <div className='burn_box_card_progress_bar'>
                <i style={{ left: '10px' }}></i>
                <p>
                  <span style={{ width: '20px' }}></span>
                </p>
                <p>
                  <span style={{ width: '20px' }}></span>
                </p>
              </div>
              <div className='burn_box_card_progress'>
                <p>Available</p>
                <p>0.0000 Old</p>
              </div>
              <div className='burn_box_card_inputbox'>
                <div className='burn_box_card_inputbox-control'>
                  <div className='burn_box_card_inputbox-input'>
                    <input
                      style={{ background: '#fff' }}
                      value={amount}
                      onChange={onChange}
                      className='input'
                    />
                  </div>
                  <div className='burn_box_card_inputbox-up' onClick={onMax}>
                    <div className='burn_box_card_inputbox-up-pref'>
                      <FormattedMessage id='poolText19' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='burn_box_card_progress burn_box_card_total'>
                <p>Total</p>
                <p>1,000,000.00</p>
              </div>
              <div className='burn_box_card_progress burn_box_card_total'>
                <p>My</p>
                <p>1,000,000.00(10.00%)</p>
              </div>
              <Button type='primary' onClick={onApprove} loading={loadFlag}>
                Burn
              </Button>
              <div className='burn_box_card_progress burn_box_card_add_contract'>
                <p>
                  Old Contract Add
                  <CopyToClipboard
                    text='0x0'
                    onCopy={() => {
                      message.success('copy success')
                    }}
                  >
                    <svg
                      t='1620653809614'
                      className='icon'
                      viewBox='0 0 1024 1024'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      p-id='1660'
                      width='20'
                      height='20'
                    >
                      <path
                        d='M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z'
                        p-id='1661'
                      ></path>
                    </svg>
                  </CopyToClipboard>
                </p>

                <p>
                  Add Old to<span className='metaMask_logo'></span>
                </p>
              </div>
              <div className='line'></div>
              <div
                className='burn_box_card_progress burn_box_card_total'
                style={{ alignItems: 'self-start' }}
              >
                <p className='new_ewards'>
                  New Rewards
                  <span>1,000,000.00(10.00%)</span>
                </p>
                <a className='claim'>Claim</a>
              </div>
              <div className='burn_box_card_progress burn_box_card_add_contract'>
                <p>
                  New Contract Add
                  <CopyToClipboard
                    text='0x0'
                    onCopy={() => {
                      message.success('copy success')
                    }}
                  >
                    <svg
                      t='1620653809614'
                      className='icon'
                      viewBox='0 0 1024 1024'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      p-id='1660'
                      width='20'
                      height='20'
                    >
                      <path
                        d='M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z'
                        p-id='1661'
                      ></path>
                    </svg>
                  </CopyToClipboard>
                </p>

                <p onClick={addToken}>
                  Add New to<span className='metaMask_logo'></span>
                </p>
              </div>
            </div>
            <div className='coming_soon'>
              <img src={comingSoon} />
              <h2>Coming soon…</h2>
            </div>
            <div className='coming_soon'>
              <img src={comingSoon} />
              <h2>Coming soon…</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Burn)
