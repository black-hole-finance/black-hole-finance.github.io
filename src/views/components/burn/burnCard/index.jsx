import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import { Button, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import BigNumber from 'bignumber.js'
import { formatAmount, numToWei } from '../../../../utils/format'
import { useActiveWeb3React } from '../../../../hooks'
import {
  useTokenBalance,
  useTokenAllowance,
  useTokenDecimals,
} from '../../../../hooks/wallet'
import ERC20 from '../../../../constants/abis/erc20.json'
import {
  BLACK_ADDRESS,
  SHIB_ADDRESS,
  SHIB_BLACK_ADDRESS,
  getContract,
} from '../../../../constants'
import { connect } from 'react-redux'
import Timer from 'react-compound-timer'
import OLD from '../../../../assets/image/burn/old@2x.png'
import NEW from '../../../../assets/image/burn/new@2x.png'
import { useBurn } from '../../../../hooks/burn'

const Burn = (props) => {
  const { active, chainId, library, account } = useActiveWeb3React()
  const { dispatch } = props
  const [amount, setAmount] = useState('')
  const [loadFlag, setLoadFlag] = useState(false)
  const [claimLoadFlag, setClaimLoadFlag] = useState(false)
  const [approve, setApprove] = useState(true)
  const [now, setNow] = useState(parseInt(Date.now() / 1000))
  const [progress, setProgress] = useState(0)

  const [burn, toBurn, toClaim] = useBurn(SHIB_BLACK_ADDRESS[chainId])

  const OldBalance = useTokenBalance(SHIB_ADDRESS[chainId])
  const OldDecimals = useTokenDecimals(SHIB_ADDRESS[chainId])

  const [hoverFlag, setHoverFlag] = useState(null)
  const [balanceProportion, setBalanceProportion] = useState(0)
  const allowance = useTokenAllowance(
    // 合约地址
    SHIB_BLACK_ADDRESS[chainId],
    SHIB_ADDRESS[chainId]
  )
  console.log(allowance, 'allowanceallowanceallowance')

  useEffect(() => {
    dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
    window.document.getElementById('container').style.display = 'none'
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      const now = parseInt(Date.now() / 1000)
      setNow(now)
    }, 1000)
    return () => {
      clearTimeout(timerId)
    }
  }, [now])

  let left_time = 0
  if (burn && burn.begin > now) {
    left_time = (burn && burn.begin - now) * 1000
  } else {
    left_time = (burn && burn.periodFinish - now) * 1000
  }

  useEffect(() => {
    console.log(allowance, 'allowance')
    if (allowance > 0) {
      setApprove(false)
    }
  }, [allowance])

  useEffect(() => {
    if (burn && burn.rewards) {
      setProgress(
        new BigNumber(formatAmount(burn.rewards))
          .dividedBy(new BigNumber(1))
          .multipliedBy(new BigNumber(100))
          .toNumber()
          .toFixed(2) * 1
      )
    } else {
      setProgress(0)
    }
  }, [burn, burn.rewards])

  useEffect(() => {
    if (burn && burn.balanceOf && burn.totalSupply) {
      setBalanceProportion(
        new BigNumber(formatAmount(burn.balanceOf))
          .dividedBy(new BigNumber(formatAmount(burn.totalSupply)))
          .multipliedBy(new BigNumber(100))
          .toNumber()
          .toFixed(2) * 1
      )
    } else {
      setBalanceProportion(0)
    }
  }, [burn, burn.balanceOf, burn.totalSupply])

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

  const onMax = () => {
    let max = OldBalance
    setAmount(formatAmount(max, 18, 8))
  }

  const addOldToken = async () => {
    try {
      let addTokenClick = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: SHIB_ADDRESS[chainId],
            symbol: 'SHIB',
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

  const addNewToken = async () => {
    try {
      let addTokenClick = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: BLACK_ADDRESS[chainId],
            symbol: 'BLACK',
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

  const onApprove = (e) => {
    if (!active) {
      return false
    }
    if (loadFlag) return

    setLoadFlag(true)
    const contract = getContract(library, ERC20, SHIB_ADDRESS[chainId])
    contract.methods
      .approve(
        // 合约地址
        SHIB_BLACK_ADDRESS[chainId],
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({
        from: account,
      })
      .on('receipt', (_, receipt) => {
        console.log('approve success')
        setLoadFlag(false)
        setApprove(false)
      })
      .on('error', (err, receipt) => {
        console.log('approve error', err)
        setLoadFlag(false)
      })
  }

  const onConfirm = () => {
    if (!active) {
      return false
    }
    if (!OldBalance) {
      return false
    }
    if (isNaN(parseInt(OldBalance))) {
      return false
    }
    if (!amount) {
      return false
    }
    if (isNaN(parseInt(amount))) {
      return false
    }

    if (loadFlag) return

    setLoadFlag(true)
    toBurn(numToWei(amount, OldDecimals))
      .then((tr) => {
        tr.wait().then(() => {
          setLoadFlag(false)
        })
      })
      .catch((e) => {
        console.log(e)
        setLoadFlag(false)
      })
  }

  const onClaim = () => {
    if (!active) {
      return false
    }
    // TODO 校验

    if (loadFlag) return

    setClaimLoadFlag(true)
    toClaim()
      .then((tr) => {
        tr.wait().then(() => {
          setClaimLoadFlag(false)
        })
      })
      .catch((e) => {
        console.log(e)
        setClaimLoadFlag(false)
      })
  }

  return (
    <>
      <div className='burn_box_card'>
        <img className='burn_box_card_old_logo' src={OLD} />
        <img className='burn_box_card_new_logo' src={NEW} />
        <h3 className='burn_box_card_title'>
          <FormattedMessage id='burn4' />
        </h3>
        <div className='burn_box_card_countdown'>
          <Timer
            initialTime={left_time}
            key={left_time}
            direction='backward'
            formatValue={(number) => {
              if (number === 0) return '00'
              if (number < 10) {
                return `0${number}`
              }
              return number
            }}
          >
            <div className='burn_box_card_day'>
              <span className='burn_box_card_countdown_title'>
                <FormattedMessage id='burn5' />
              </span>
              <p className='burn_box_card_countdown_time'>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ h, d, formatValue }) =>
                      parseInt(d / 10) * 1 > 0 ? parseInt(d / 10) : '0'
                    }
                  </Timer.Consumer>
                </span>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ h, d, formatValue }) =>
                      (d / 10).toString().split('.')[1] &&
                      (d / 10).toString().split('.')[1] * 1 > 0
                        ? (d / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
              </p>
            </div>
            <span className='delimiter'>:</span>
            <div className='burn_box_card_day'>
              <span className='burn_box_card_countdown_title'>
                <FormattedMessage id='burn6' />
              </span>
              <p className='burn_box_card_countdown_time'>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ h, d, formatValue }) =>
                      parseInt(h / 10) * 1 > 0 ? parseInt(h / 10) : '0'
                    }
                  </Timer.Consumer>
                </span>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ h, d, formatValue }) =>
                      (h / 10).toString().split('.')[1] &&
                      (h / 10).toString().split('.')[1] * 1 > 0
                        ? (h / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
              </p>
            </div>
            <span className='delimiter'>:</span>

            <div className='burn_box_card_day'>
              <span className='burn_box_card_countdown_title'>
                <FormattedMessage id='burn7' />
              </span>
              <p className='burn_box_card_countdown_time'>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ m, h, formatValue }) =>
                      parseInt(m / 10) * 1 > 0 ? parseInt(m / 10) : '0'
                    }
                  </Timer.Consumer>
                </span>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ m, h, formatValue }) =>
                      (m / 10).toString().split('.')[1] &&
                      (m / 10).toString().split('.')[1] * 1 > 0
                        ? (m / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
              </p>
            </div>
            <span className='delimiter'>:</span>

            <div className='burn_box_card_day'>
              <span className='burn_box_card_countdown_title'>
                <FormattedMessage id='burn8' />
              </span>
              <p className='burn_box_card_countdown_time'>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ s, m, formatValue }) =>
                      parseInt(s / 10) * 1 > 0 ? parseInt(s / 10) : '0'
                    }
                  </Timer.Consumer>
                </span>
                <span className='burn_box_card_time'>
                  <Timer.Consumer>
                    {({ s, m, formatValue }) =>
                      (s / 10).toString().split('.')[1] &&
                      (s / 10).toString().split('.')[1] * 1 > 0
                        ? (s / 10).toString().split('.')[1]
                        : '0'
                    }
                  </Timer.Consumer>
                </span>
              </p>
            </div>
          </Timer>
        </div>
        <div className='burn_box_card_progress'>
          <p>
            <FormattedMessage id='burn9' />({progress}%)
          </p>
          <p>
            {(burn && formatAmount(burn.rewards)) || '-'}
            <span>/1</span>
          </p>
        </div>
        <div className='burn_box_card_progress_bar'>
          <i
            style={{
              left: `${progress >= 100 ? 100 : progress}%`,
            }}
          ></i>
          <p>
            <span
              style={{ width: `${progress >= 100 ? 100 : progress}%` }}
            ></span>
          </p>
          <p>
            <span
              style={{ width: `${progress >= 100 ? 100 : progress}%` }}
            ></span>
          </p>
        </div>
        <div className='burn_box_card_progress'>
          <p>
            <FormattedMessage id='burn10' />
          </p>
          <p>
            {formatAmount(OldBalance)} <FormattedMessage id='burn11' />
          </p>
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
                <FormattedMessage id='warLBP8' />
              </div>
            </div>
          </div>
        </div>
        <div className='burn_box_card_progress burn_box_card_total'>
          <p>
            <FormattedMessage id='burn12' />
          </p>
          <p>{(burn && formatAmount(burn.totalSupply)) || '-'}</p>
        </div>
        <div className='burn_box_card_progress burn_box_card_total'>
          <p>
            <FormattedMessage id='burn13' />
          </p>
          <p>
            {(burn && formatAmount(burn.balanceOf)) || '-'}({balanceProportion}
            %)
          </p>
        </div>
        {approve && (
          <Button type='primary' onClick={onApprove} loading={loadFlag}>
            <FormattedMessage id='burn14' />
          </Button>
        )}
        {!approve && (
          <Button type='primary' onClick={onConfirm} loading={loadFlag}>
            <FormattedMessage id='burn15' />
          </Button>
        )}
        <div className='burn_box_card_progress burn_box_card_add_contract'>
          <p
            onMouseOver={() => setHoverFlag('oldAddress')}
            onMouseOut={() => setHoverFlag(null)}
          >
            {hoverFlag === 'oldAddress' && (
              <i className='tips_content'>{SHIB_ADDRESS[chainId]}</i>
            )}
            <FormattedMessage id='burn16' />
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

          <p onClick={addOldToken}>
            <FormattedMessage id='burn17' />
            <span className='metaMask_logo'></span>
          </p>
        </div>
        <div className='line'></div>
        <div
          className='burn_box_card_progress burn_box_card_total'
          style={{ alignItems: 'self-start' }}
        >
          <p className='new_ewards'>
            <FormattedMessage id='burn18' />
            <span>{(burn && formatAmount(burn.earned)) || '-'}</span>
          </p>

          <Button
            type='primary'
            className='claim'
            onClick={onClaim}
            loading={claimLoadFlag}
          >
            <FormattedMessage id='burn21' />
          </Button>

          {/* <a className='claim' onClick={onClaim}>
            <FormattedMessage id='burn21' />
          </a> */}
        </div>
        <div className='burn_box_card_progress burn_box_card_add_contract'>
          <p
            onMouseOver={() => setHoverFlag('newAddress')}
            onMouseOut={() => setHoverFlag(null)}
          >
            {hoverFlag === 'newAddress' && (
              <i className='tips_content'>{BLACK_ADDRESS[chainId]}</i>
            )}
            <FormattedMessage id='burn19' />
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

          <p onClick={addNewToken}>
            <FormattedMessage id='burn20' />
            <span className='metaMask_logo'></span>
          </p>
        </div>
      </div>
    </>
  )
}

export default connect((store) => ({
  changeNetworkFlag: store.popup.changeNetworkFlag,
  showMenuMaskModal: store.menu.showMenuMaskModal,
}))(withRouter(Burn))
