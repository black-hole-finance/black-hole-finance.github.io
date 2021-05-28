import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { withRouter } from 'react-router'
import { useLBP } from '../../../hooks/lbp'
import Timer from 'react-compound-timer'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import {
  ChainId,
  getContract,
  LBP_ADDRESS,
  OFFERING_ADDRESS,
} from '../../../constants'
import Offering from '../../../constants/abis/offering.json'
import { useActiveWeb3React } from '../../../hooks'
import { LBP_ABI } from '../../../constants/abis/lbp'
import { numToWei, formatAmount } from '../../../utils/format'
import './index.less'
import { message } from 'antd'
import { connectWallet } from '../../../utils'
import { injected } from '../../../connectors'

const LBP = (props) => {
  const { intl, dispatch, slippageVal } = props // 滑点
  const {
    active,
    chainId,
    library,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const now = parseInt(Date.now() / 1000)
  // const [left_time, setLeftTime] = useState(0)
  const [fee, setFee] = useState(0)

  useLBP()

  const { start_at, end_at, price, status, balance } = props.info
  console.table(props.info)

  const [amount, setAmount] = useState(1)

  let left_time = 0
  switch (status) {
    case 0:
      left_time = (start_at - now) * 1000
      break
    case 1:
      left_time = (end_at - now) * 1000
      break
  }

  const onMax = async () => {
    if (props.info.balance <= 0) {
      setAmount(0)
      return false
    }
    let max = props.info.balance
    const maxB = new BigNumber(max)

    const contract = getContract(library, LBP_ABI, LBP_ADDRESS[chainId])

    // 估算一下gas费
    const strapOut = await contract.methods
      .getStrapOut(max)
      .call({ from: account })
    let minOut = new BigNumber(strapOut)
      .multipliedBy(
        new BigNumber(100)
          .minus(new BigNumber(slippageVal))
          .dividedBy(new BigNumber(100))
      )
      .toFixed(0, 1)
      .toString()
    const gas_limit = await contract.methods.strap(minOut).estimateGas({
      from: account,
      value: max,
    })
    const gas_price = Web3.utils.toWei('100', 'gwei')
    const gas_fee = new BigNumber(gas_limit).multipliedBy(
      new BigNumber(gas_price)
    )

    max = maxB.gt(gas_fee) ? maxB.minus(gas_fee).toString() : 0
    setAmount(formatAmount(max, props.info.currency.decimal, 6))
  }

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

  // 募资事件
  const onPurchase = async () => {
    if (isNaN(amount * 1)) {
      return false
    }

    if (amount < 0) {
      return false
    }

    if (!active) {
      connectWallet(activate, injected, deactivate)
      return false
    }

    const lbp_contract = getContract(library, LBP_ABI, LBP_ADDRESS[chainId])

    const strapOut = await lbp_contract.methods
      .getStrapOut(numToWei(amount))
      .call({ from: account })

    let minOut = new BigNumber(strapOut)
      .multipliedBy(
        new BigNumber(100)
          .minus(new BigNumber(slippageVal))
          .dividedBy(new BigNumber(100))
      )
      .toFixed(0, 1)
      .toString()
    return lbp_contract.methods
      .strap(minOut)
      .send({
        from: account,
        value: numToWei(amount),
      })
      .on('transactionHash', (hash) => {
        message.info('broadcast success')
      })
      .on('receipt', (_, receipt) => {
        message.success('purchase success')
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        if (confirmationNumber - 0 === 0) {
          dispatch({
            type: 'HANDLE_WALLET_MODAL',
            payload: 'slippageSuccess',
          })
        }
      })
      .on('error', (err, receipt) => {
        message.error('purchase fail')
      })
  }

  const renderStatus = (pool) => {
    const { status, timeClose = 0 } = pool.info
    switch (status) {
      case 0:
        return (
          <span className='detail_LBP_coming_status'>
            <FormattedMessage id='willStart' />
          </span>
        )
      case 1:
        if (timeClose === 0 || timeClose > now) {
          return (
            <span className='detail_LBP_progress_status'>
              <FormattedMessage id='recruit' />
            </span>
          )
        } else {
          return (
            <span className='detail_LBP_progress_status'>
              <FormattedMessage id='recruitOver' />
            </span>
          )
        }
      case 3:
        return (
          <span className='detail_LBP_over_status'>
            <FormattedMessage id='completed' />
          </span>
        )
    }
  }

  return (
    <div className='detail_LBP'>
      <h2 className='detail_LBP_title'>
        {props && props.info && props.info.name}
      </h2>
      <div className='detail_LBP_card'>
        <div className='detail_LBP_card_title'>
          <h2 className='LBP_title'>
            <FormattedMessage id='warLBP1' />
          </h2>
          <p className='detail_LBP_card_title_right'>
            {renderStatus(props)}
            {props && props.info.status < 3 && left_time > 0 && (
              <span className='detail_LBP_time'>
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
                  <span>
                    <Timer.Consumer>
                      {({ h, d, formatValue }) => formatValue(d * 24 + h)}
                    </Timer.Consumer>
                  </span>
                  &nbsp;:&nbsp;
                  <span>
                    <Timer.Minutes />
                  </span>
                  &nbsp;:&nbsp;
                  <span>
                    <Timer.Seconds />
                  </span>
                </Timer>
              </span>
            )}
          </p>
        </div>
        <p className='detail_LBP_card_ratio'>{props && props.info.ratio}</p>
        <div className='detail_LBP_card_purchase'>
          <span className='purchase_title'>
            <FormattedMessage id='warLBP2' />
          </span>
          <span className='balance'>
            <FormattedMessage id='warLBP3' />
            {props.info &&
              props.info.balance &&
              `${formatAmount(props.info.balance)} ${
                props.info.currency.symbol
              }`}
          </span>
        </div>
        <div className='detail_LBP_inputbox'>
          <div className='detail_LBP_inputbox-control'>
            <div className='detail_LBP_inputbox-input'>
              <input
                style={{ background: '#fff' }}
                value={amount}
                onChange={onChange}
                className='input'
              />
            </div>

            <div className='detail_LBP_inputbox-up' onClick={onMax}>
              <div className='detail_LBP_inputbox-up-pref'>
                <FormattedMessage id='warLBP8' />
              </div>
            </div>
            {/* 设置滑点弹框 */}
            <a
              className='set_slippage'
              onClick={() => {
                dispatch({ type: 'HANDLE_WALLET_MODAL', payload: 'slippage' })
              }}
            >
              <svg
                t='1619325556317'
                className='icon'
                viewBox='0 0 1024 1024'
                version='1.1'
                p-id='2296'
                width='24'
                height='28'
              >
                <path
                  d='M146.285714 512c0-36.169143 4.022857-71.168 11.556572-104.667429 41.179429 2.486857 80.128-21.650286 100.754285-62.500571a140.8 140.8 0 0 0-2.962285-130.962286c44.214857-49.737143 98.742857-85.76 158.537143-104.704 18.724571 42.057143 56.502857 68.534857 97.792 68.534857s79.067429-26.477714 97.792-68.534857c59.757714 18.944 114.322286 55.003429 158.537142 104.704a140.8 140.8 0 0 0-2.998857 131.035429c20.662857 40.850286 59.611429 64.987429 100.827429 62.464 7.533714 33.462857 11.556571 68.461714 11.556571 104.630857 0 36.169143-4.022857 71.168-11.556571 104.667429-41.216-2.486857-80.128 21.650286-100.790857 62.464a140.8 140.8 0 0 0 2.962285 130.998857c-44.214857 49.737143-98.742857 85.76-158.537142 104.704-18.724571-42.057143-56.502857-68.534857-97.792-68.534857s-79.067429 26.477714-97.792 68.534857c-59.757714-18.944-114.322286-55.003429-158.537143-104.704a140.8 140.8 0 0 0 2.998857-131.035429c-20.662857-40.850286-59.611429-64.987429-100.827429-62.464A477.257143 477.257143 0 0 1 146.285714 512z m175.689143 125.403429a234.788571 234.788571 0 0 1 20.626286 147.273142 286.354286 286.354286 0 0 0 47.433143 31.341715c33.536-34.304 76.946286-53.284571 121.965714-53.248 46.08 0 89.161143 19.675429 121.965714 53.248a286.354286 286.354286 0 0 0 47.433143-31.341715 234.642286 234.642286 0 0 1 20.626286-147.273142c22.491429-44.544 58.550857-78.043429 101.302857-94.061715 1.682286-20.845714 1.682286-41.837714 0-62.683428-42.788571-16.018286-78.848-49.481143-101.339429-94.061715a234.642286 234.642286 0 0 1-20.626285-147.273142 285.696 285.696 0 0 0-47.433143-31.341715c-33.499429 34.304-76.946286 53.284571-121.929143 53.248-44.982857 0-88.429714-18.944-121.965714-53.248-16.64 8.740571-32.548571 19.2-47.433143 31.341715a234.642286 234.642286 0 0 1-20.626286 147.273142c-22.491429 44.544-58.550857 78.043429-101.302857 94.061715-1.682286 20.845714-1.682286 41.837714 0 62.683428 42.788571 16.018286 78.848 49.481143 101.339429 94.061715h-0.036572z m190.025143 0c-60.598857 0-109.714286-56.137143-109.714286-125.403429s49.115429-125.403429 109.714286-125.403429 109.714286 56.137143 109.714286 125.403429-49.115429 125.403429-109.714286 125.403429z m0-83.602286c20.187429 0 36.571429-18.724571 36.571429-41.801143s-16.384-41.801143-36.571429-41.801143-36.571429 18.724571-36.571429 41.801143 16.384 41.801143 36.571429 41.801143z'
                  p-id='2297'
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <button className='btn' type='button' onClick={onPurchase}>
          <FormattedMessage id='warLBP2' />
        </button>
      </div>
    </div>
  )
}

export default connect((store) => ({
  info: store.lbp.info,
  slippageVal: store.popup.slippageVal,
}))(withRouter(LBP))
