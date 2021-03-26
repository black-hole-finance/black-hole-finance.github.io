import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { useActiveWeb3React } from '../../../hooks'
import Offering from '../../../constants/abis/Offering.json'
import { getContract } from '../../../constants'
import './index.less'

const Detail = (props) => {
  const {
    address,
    currency_symbol,
    currency_allocation,
    token_symbol,
    token_allocation,
    cliamable_balance,
    wallet_amount,
    round,
  } = props.connectPools
  const { active, chainId, library, account } = useActiveWeb3React()

  const onClaim = () => {
    const pool_contract = getContract(library, Offering, address)
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
            {currency_allocation}
            <span>（{currency_symbol}）</span>
          </p>
        </div>
        <div className='detail_allocation_btn'>
          <a>
            <FormattedMessage id='detail_text_21' />
          </a>
          <p className='detail_allocation_coin'>
            {token_allocation}
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
              <p>
                <span>
                  <FormattedMessage id='detail_text_12' />
                </span>
                <span>{address}</span>
              </p>
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
                <span>{wallet_amount}</span>
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
                    {cliamable_balance} {token_symbol}
                  </span>
                  <a onClick={onClaim}>
                    <FormattedMessage id='detail_text_22' />
                  </a>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <a className='detail_claim_btn' onClick={onClaim}>
        <FormattedMessage id='detail_text_22' />
      </a>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(Detail))
