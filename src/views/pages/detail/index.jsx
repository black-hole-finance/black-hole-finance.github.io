import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { useActiveWeb3React } from '../../../hooks'
import { message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Offering from '../../../constants/abis/offering.json'
import {
  BLACK_ADDRESS,
  ChainId,
  getContract,
  OFFERING_ADDRESS,
} from '../../../constants'
import './index.less'
import { formatAmount, fromWei } from '../../../utils/format'
import { useInvestmentInfo } from '../../../hooks/offering'

const Detail = (props) => {
  const {
    currency_symbol,
    currency_allocation,
    eth_usdt,
    token_symbol,
    token_allocation,
    cliamable_balance,
    wallet_amount,
    round,
  } = props.connectPools
  useInvestmentInfo()
  const { active, chainId, library, account } = useActiveWeb3React()

  useEffect(() => {
    if (props.location.pathname.indexOf('investment') > -1) {
      window.document.getElementById('container').style.display = 'none'
    }
  }, [])

  const onClaim = () => {
    if (formatAmount(cliamable_balance) - 0 === 0) return
    const pool_contract = getContract(
      library,
      Offering,
      OFFERING_ADDRESS[chainId]
    )
    pool_contract.methods
      .unlock()
      .send({ from: account })
      .then((re) => {
        console.log(re)
      })
  }

  return (
    <div className='detail'>
      <div className='detail_allocation'>
        <div className='detail_allocation_btn'>
          <a>
            <FormattedMessage id='detail_text_20' />
          </a>
          <p className='detail_allocation_coin'>
            {formatAmount(currency_allocation, eth_usdt) - 0
              ? formatAmount(currency_allocation, eth_usdt)
              : '-'}
            <span>（{currency_symbol}）</span>
          </p>
        </div>
        <div className='detail_allocation_btn'>
          <a>
            <FormattedMessage id='detail_text_21' />
          </a>
          <p className='detail_allocation_coin'>
            {formatAmount(token_allocation) - 0
              ? formatAmount(token_allocation)
              : '-'}
            <span>（{token_symbol}）</span>
          </p>
        </div>
      </div>
      <table className='detail_table'>
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
              <div>
                <span>
                  <FormattedMessage id='detail_text_12' />
                </span>
                <p>
                  <span className='address_style'>
                    {BLACK_ADDRESS[chainId]}
                  </span>

                  <CopyToClipboard
                    text={BLACK_ADDRESS[chainId]}
                    onCopy={() => {
                      message.success('copy success')
                    }}
                  >
                    <a className='connect_wallet'></a>
                  </CopyToClipboard>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>
                  <FormattedMessage id='detail_text_13' />
                </span>
                <span>{round}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>
                  <FormattedMessage id='detail_text_14' />
                </span>
                <span>
                  {formatAmount(wallet_amount) - 0
                    ? formatAmount(wallet_amount)
                    : '-'}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <span>
                  <FormattedMessage id='detail_text_15' />
                </span>
                <p className='money_claim'>
                  <span>
                    {formatAmount(cliamable_balance)} {token_symbol}
                  </span>
                  <a
                    className={cs(
                      formatAmount(cliamable_balance) - 0 === 0 &&
                        'disable_style'
                    )}
                    onClick={onClaim}
                  >
                    <FormattedMessage id='detail_text_22' />
                  </a>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <a
        className={cs(
          formatAmount(cliamable_balance) - 0 === 0 && 'disable_style',
          'detail_claim_btn'
        )}
        onClick={onClaim}
      >
        <FormattedMessage id='detail_text_22' />
      </a>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(Detail))
