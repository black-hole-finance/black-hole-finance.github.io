import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../hooks'
import Offering from '../../../constants/abis/offering.json'
import ERC20 from '../../../constants/abis/erc20.json'
import {BLACK_ADDRESS, ChainId, getContract, OFFERING_ADDRESS, USDT_ADDRESS} from '../../../constants'
import './index.less'
import {useTokenAllowance} from "../../../hooks/wallet";
import {formatAmount} from "../../../utils/format";

const ConnectWalletSuccessPopup = (props) => {
  const { dispatch } = props
  const { token_address, currency_symbol, currency_allocation } = props.connectPools
  const { active, chainId, library, account } = useActiveWeb3React()
  const [btnFlag, setBtnFlag] = useState(0)
  const allowance = useTokenAllowance(OFFERING_ADDRESS[chainId], USDT_ADDRESS[chainId])

  useEffect(() => {
    if(parseInt(allowance) > 0){
      // 如果大于0
      setBtnFlag(1)
    }else{
      setBtnFlag(0)
    }
  }, [allowance])

  // 授权
  const onApprove = () => {
    if (btnFlag - 0) return
    let pool_contract = getContract(library, ERC20, USDT_ADDRESS[chainId])
    pool_contract.methods
      .approve(
        OFFERING_ADDRESS[chainId],
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({ from: account })
      .then((re) => {
        console.log(re)
      })
  }

  // 付款 募资
  const onContribute = () => {
    if (!(btnFlag - 0)) return
    let pool_contract = getContract(library, Offering, OFFERING_ADDRESS[chainId])
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
          {formatAmount(currency_allocation, chainId === ChainId.RINKEBY ? 6 : 18, 2)} {currency_symbol}
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
