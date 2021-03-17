import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'

const Detail = () => {
  const [detailTab, setDetailTab] = useState('detail')

  return (
    <div className='detail'>
      <div className='detail_allocation'>
        <div className='detail_allocation_btn'>
          <a>
            <FormattedMessage id='detail_text_20' />
          </a>
          <p className='detail_allocation_coin'>
            000,000
            <span>（USDT）</span>
          </p>
        </div>
        <div className='detail_allocation_btn'>
          <a>
            <FormattedMessage id='detail_text_21' />
          </a>
          <p className='detail_allocation_coin'>
            000,000,000
            <span>（BLACK）</span>
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
                <span>0X000000000000XXXXXXXXXXXXXXXXXXX</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>
                  <FormattedMessage id='detail_text_13' />
                </span>
                <span>SEED</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <span>
                  <FormattedMessage id='detail_text_14' />
                </span>
                <span>0</span>
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
                  <span>0 BLACK</span>
                  <a>
                    <FormattedMessage id='detail_text_22' />
                  </a>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <a className='detail_claim_btn'>
        <FormattedMessage id='detail_text_22' />
      </a>
    </div>
  )
}

export default Detail
