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
import {BLACK_ADDRESS, ChainId, getContract} from '../../../../constants'
import { connect } from 'react-redux'
import Timer from 'react-compound-timer'
import { useBurn } from '../../../../hooks/burn'
import {changeNetwork} from "../../../../utils";

const Burn = (props) => {
  const { active, chainId, library, account } = useActiveWeb3React()
  const {
    dispatch,
    poolConfig
  } = props
  const {
    address,
    poolTitle,
    stakingToken,
    rewardsToken,
    stakingTokenSymbol,
    rewardsTokenSymbol,
    stakingIcon,
    rewardsTokenIcon,
    rewardsTotal
  } = poolConfig
  const [amount, setAmount] = useState('')
  const [loadFlag, setLoadFlag] = useState(false)
  const [claimLoadFlag, setClaimLoadFlag] = useState(false)
  const [approve, setApprove] = useState(true)
  const [now, setNow] = useState(parseInt(Date.now() / 1000))
  const [progress, setProgress] = useState(0)
  const wallet_amount = useTokenBalance(BLACK_ADDRESS[chainId])

  let [burn, toBurn, toClaim] = useBurn(address, poolConfig)
  console.log('burn', burn)
    // burn = poolConfig
  const OldBalance = useTokenBalance(stakingToken)
  const OldDecimals = useTokenDecimals(stakingToken)

  const [hoverFlag, setHoverFlag] = useState(null)
  const [balanceProportion, setBalanceProportion] = useState(0)
  const allowance = useTokenAllowance(
    // 合约地址
    address,
    stakingToken
  )

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
  let poolType = 'not_started' //not_started ing end
  if (burn) {
    if (now < burn.begin) {
      // 未开始
      left_time = (burn.begin - now) * 1000
      poolType = 'not_started'
    } else if (burn.begin < now && now < burn.periodFinish) {
      // 进行中
      left_time = (burn && burn.periodFinish - now) * 1000
      poolType = 'ing'
    } else if (now > burn.periodFinish){
      poolType = 'end'
    }
    console.log('left_time', left_time, burn, now, poolType)
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
          .dividedBy(new BigNumber(rewardsTotal))
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
      const maxAmount = formatAmount(wallet_amount)
      let resultAmount = Number(value) > Number(maxAmount) ? maxAmount : value
      const point = resultAmount.toString().split(".")
      if (point[1] && point[1].length > 8) {
        resultAmount = Number(resultAmount).toFixed(8)
      }
      setAmount(resultAmount)
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
            address: stakingToken,
            symbol: stakingTokenSymbol,
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
            address: rewardsToken,
            symbol: rewardsTokenSymbol,
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
    const contract = getContract(library, ERC20, stakingToken)
    contract.methods
      .approve(
        // 合约地址
        address,
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
    if (!amount || amount<=0) {
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
        <img className='burn_box_card_old_logo' src={stakingIcon} />
        <img className='burn_box_card_new_logo' src={rewardsTokenIcon} />
        <h3 className='burn_box_card_title'>
          <FormattedMessage id='burn4' values={{ B: poolTitle }}/>
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
            <span>/{rewardsTotal}</span>
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
            {formatAmount(OldBalance)} {stakingTokenSymbol}
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
            {(burn && formatAmount(burn.balanceOf||0)) || '-'}({balanceProportion}
            %)
          </p>
        </div>
        {
          poolType === 'end' ? (
              <Button type='primary'>
                <FormattedMessage id='burnEnd' />
              </Button>
          ) : poolType === 'not_started' ? (
              <Button type='primary'>
                <FormattedMessage id='burnNotStarted' />
              </Button>
          ) : chainId != ChainId.HECO ? (
              <Button type='primary' onClick={()=>changeNetwork(ChainId.HECO)}>
                <FormattedMessage
                    id='switchNetwork'
                    values={{ chain: 'HECO' }}
                />
              </Button>
          ) : (
              <>
                {approve && (
                    <Button type='primary' onClick={onApprove} loading={loadFlag} disabled={!active}>
                      <FormattedMessage id='burn14' />
                    </Button>
                )}
                {!approve && (
                    <Button type='primary' onClick={onConfirm} loading={loadFlag} disabled={!active}>
                      <FormattedMessage id='burn15' />
                    </Button>
                )}
              </>
          )
        }
        <div className='burn_box_card_progress burn_box_card_add_contract'>
          <p
            onMouseOver={() => setHoverFlag('oldAddress')}
            onMouseOut={() => setHoverFlag(null)}
          >
            {hoverFlag === 'oldAddress' && (
              <i className='tips_content'>{stakingToken}</i>
            )}
            <FormattedMessage
              id='burn16'
              values={{ token: stakingTokenSymbol }}
            />
            <CopyToClipboard
              text={stakingToken}
              onCopy={() => {
                message.success('copy success')
              }}
            >
              <svg
                t='1622303053476'
                class='icon'
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='1279'
                width='16'
                height='16'
              >
                <path
                  d='M384 320V224a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32H704v96c0 17.664-14.4 32-32.256 32H288.192A32 32 0 0 1 256 800l0.128-448c0-17.664 14.336-32 32.192-32H384z m-63.872 64L320 768h320V384H320.128zM448 320h256v320h64V256H448v64z'
                  p-id='1280'
                ></path>
              </svg>
            </CopyToClipboard>
          </p>

          <p onClick={addOldToken}>
            <FormattedMessage
              id='burn17'
              values={{ token: stakingTokenSymbol }}
            />
            <span className='metaMask_logo'></span>
          </p>
        </div>
        <div className='line'></div>
        <div
          className='burn_box_card_progress burn_box_card_total'
          style={{ alignItems: 'self-start' }}
        >
          <p className='new_ewards'>
            <FormattedMessage
              id='burn18'
              values={{ token: rewardsTokenSymbol }}
            />
            <span>{(burn && new BigNumber(formatAmount(burn.earned, 18, 18))).toFixed() || '-'}</span>
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
              <i className='tips_content'>{rewardsToken}</i>
            )}
            <FormattedMessage
              id='burn19'
              values={{ token: rewardsTokenSymbol }}
            />
            <CopyToClipboard
              text={rewardsToken}
              onCopy={() => {
                message.success('copy success')
              }}
            >
              <svg
                t='1622303053476'
                class='icon'
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='1279'
                width='16'
                height='16'
              >
                <path
                  d='M384 320V224a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32H704v96c0 17.664-14.4 32-32.256 32H288.192A32 32 0 0 1 256 800l0.128-448c0-17.664 14.336-32 32.192-32H384z m-63.872 64L320 768h320V384H320.128zM448 320h256v320h64V256H448v64z'
                  p-id='1280'
                ></path>
              </svg>
            </CopyToClipboard>
          </p>

          <p onClick={addNewToken}>
            <FormattedMessage
              id='burn20'
              values={{ token: rewardsTokenSymbol }}
            />
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
