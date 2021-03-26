import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../hooks'
import Offering from '../../../constants/abis/Offering.json'
import ERC20 from '../../../constants/abis/erc20.json'
import { getContract } from '../../../constants'
import './index.less'

const ConnectWalletSuccessPopup = (props) => {
  const { dispatch } = props
  const { address, token_address, currency_symbol } = props.connectPools
  const { active, chainId, library, account } = useActiveWeb3React()
  const [btnFlag, setBtnFlag] = useState('0')
  // 判断是否授权 返回值为 0 则未授权，否则 已授权
  const whetherApprove = () => {
    let pool_contract = getContract(library, ERC20, token_address)
    pool_contract.methods
      .allowance(account, address)
      .call({ from: account })
      .then((re) => {
        setBtnFlag(re)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    whetherApprove()
  }, [btnFlag])

  // 授权
  const onApprove = () => {
    if (btnFlag - 0) return
    let pool_contract = getContract(library, ERC20, token_address)
    pool_contract.methods
      .approve(
        address,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({ from: account })
      .then((re) => {
        console.log(re)
        whetherApprove()
      })
  }
  // 付款 募资
  const onContribute = () => {
    if (!(btnFlag - 0)) return
    let pool_contract = getContract(library, Offering, address)
    pool_contract.methods
      .offer()
      .send({ from: account })
      .then((re) => {
        console.log(re)
        // 当募资完成后关闭弹框
        dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: false })
      })
  }

  return (
    <div className='connect_wallet_success_popup'>
      <span className='account_png'></span>
      <p>
        <FormattedMessage id='successPopup_text_1' />
        <span>
          {props.balance} {currency_symbol}
        </span>
      </p>
      <div className='connect_wallet_success_popup_btn'>
        <a onClick={onApprove} className={cs(btnFlag - 0 && 'disable_click')}>
          <FormattedMessage id='successPopup_text_2' />
        </a>
        <a
          onClick={onContribute}
          className={cs(!(btnFlag - 0) && 'disable_click')}
        >
          <FormattedMessage id='successPopup_text_3' />
        </a>
      </div>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(ConnectWalletSuccessPopup))
