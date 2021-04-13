import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../hooks'
import Offering from '../../../constants/abis/offering.json'
import ERC20 from '../../../constants/abis/erc20.json'
import {
  BLACK_ADDRESS,
  ChainId,
  getContract,
  OFFERING_ADDRESS,
  USDT_ADDRESS,
} from '../../../constants'
import './index.less'
import { useTokenAllowance } from '../../../hooks/wallet'
import { formatAmount } from '../../../utils/format'

const ConnectWalletSuccessPopup = (props) => {
  const { dispatch } = props
  const {
    token_address,
    currency_symbol,
    currency_allocation,
    eth_usdt,
  } = props.connectPools
  const { active, chainId, library, account } = useActiveWeb3React()
  const [btnFlag, setBtnFlag] = useState(0)
  // 添加 授权&付款 loading
  const [loadingFlag, setLoadingFlag] = useState(false)
  const [onApproveLoadingFlag, setOnApproveLoadingFlag] = useState(false)
  const allowance = useTokenAllowance(
    OFFERING_ADDRESS[chainId],
    USDT_ADDRESS[chainId]
  )

  useEffect(() => {
    if (parseInt(allowance) > 0) {
      // 如果大于0
      setBtnFlag(1)
    } else {
      setBtnFlag(0)
    }
  }, [allowance])

  useEffect(() => {
    if (parseInt(allowance) > 0) {
      // 如果大于0
      setBtnFlag(1)
    } else {
      setBtnFlag(0)
    }
  }, [onApproveLoadingFlag])

  // 授权
  const onApprove = () => {
    // if (btnFlag - 0 || onApproveLoadingFlag) return
    let pool_contract = getContract(library, ERC20, USDT_ADDRESS[chainId])
    pool_contract.methods
      .approve(
        OFFERING_ADDRESS[chainId],
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )

      .send({ from: account }, () => {
        setOnApproveLoadingFlag(true)
      })
      .on('confirmation', (confirmationNumber) => {
        confirmationNumber - 0 === 0 && setOnApproveLoadingFlag(false)
      })
      .on('error', () => {
        setOnApproveLoadingFlag(false)
      })
  }

  // 付款 募资
  const onContribute = () => {
    if (!(btnFlag - 0) || loadingFlag) return
    let pool_contract = getContract(
      library,
      Offering,
      OFFERING_ADDRESS[chainId]
    )
    pool_contract.methods
      .offer()
      .send({ from: account }, () => {
        setLoadingFlag(true)
      })
      .on('confirmation', (confirmationNumber) => {
        confirmationNumber - 0 === 0 && setLoadingFlag(false)
        // 当募资完成后关闭弹框
        dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: false })
      })
      .on('error', () => {
        setLoadingFlag(false)
      })
  }

  return (
    <div className='connect_wallet_success_popup'>
      <span className='account_png'></span>
      <p>
        <FormattedMessage id='successPopup_text_1' />
        <span>
          {formatAmount(currency_allocation, eth_usdt, 2)} {currency_symbol}
        </span>
      </p>
      <div className='connect_wallet_success_popup_btn'>
        <a onClick={onApprove} className={cs(btnFlag - 0 && 'disable_click')}>
          {!onApproveLoadingFlag && (
            <FormattedMessage id='successPopup_text_2' />
          )}

          {onApproveLoadingFlag && (
            <p className='loadEffect'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </p>
          )}
        </a>
        <a
          onClick={onContribute}
          className={cs(!(btnFlag - 0) && 'disable_click')}
        >
          {!loadingFlag && <FormattedMessage id='successPopup_text_3' />}
          {loadingFlag && (
            <p className='loadEffect'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </p>
          )}
        </a>
      </div>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(ConnectWalletSuccessPopup))
