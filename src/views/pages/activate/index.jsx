import React, { Fragment, useEffect, useState } from 'react'
import './index.less'
import { useActivate } from './hook'
import { formatAmount } from '../../../utils/format'
import { Button, message } from 'antd'
import {
  BUSD_ADDRESS,
  ChainId,
  getContract,
  iBLACK_ADDRESS,
  OFFERING_ADDRESS,
  OPTION_FACTORY_ADDRESS,
  USDT_ADDRESS,
} from '../../../constants'
import { FormattedMessage } from 'react-intl'
import { useActiveWeb3React } from '../../../hooks'
import { iBlack_ABI } from '../../../constants/abis/iBlack'
import ERC20 from '../../../constants/abis/erc20.json'
import { connectWallet } from '../../../utils'
import { injected } from '../../../connectors'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const Activate = (props) => {
  const {
    active,
    chainId,
    library,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const { dispatch } = props
  const data = useActivate()
  const [loading, setLoading] = useState(false)
  const { busd_allowance, busd_balance, exercise_amount, iblack_balance } = data

  const onConnect = () => {
    if (!active) {
      connectWallet(activate, injected, deactivate)
    }
  }

  useEffect(() => {
    window.document.getElementById('container').style.display = 'none'
  }, [])

  useEffect(() => {
    if (chainId !== 56) {
      dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: true })
    }
  }, [chainId])

  const onActivate = (e) => {
    if (loading) {
      return false
    }

    if (!active) {
      connectWallet(activate, injected, deactivate)
      return false
    }

    // if(iblack_balance <= 0){
    //   message.error('Insufficient funds')
    //   return  false
    // }

    if (exercise_amount <= 0) {
      return false
    }

    // if(busd_balance - exercise_amount < 0){
    //   message.error('Insufficient funds')
    //   return  false
    // }

    // 检查是否需要授权
    if (busd_allowance - exercise_amount < 0) {
      onApprove(e)
      return false
    }

    // 授权过
    const contract = getContract(library, iBlack_ABI, iBLACK_ADDRESS[chainId])

    contract.methods
      .exercise()
      .send({ from: account }, () => {
        setLoading(true)
      })
      .on('confirmation', (confirmationNumber) => {
        setLoading(false)
      })
      .on('error', () => {
        setLoading(false)
        message.error('activate fail')
      })
  }

  // 授权
  const onApprove = () => {
    const contract = getContract(library, ERC20, BUSD_ADDRESS[chainId])
    contract.methods
      .approve(
        OPTION_FACTORY_ADDRESS[chainId],
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({ from: account }, () => {
        setLoading(true)
      })
      .on('confirmation', (confirmationNumber) => {
        setLoading(false)
      })
      .on('error', () => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className='activate'>
        <h2 className='activate_title'>
          <FormattedMessage id='activate1' />
        </h2>
        <div className='activate_card'>
          <div className='stepThree'>
            <div className='step_title'>
              <FormattedMessage id='activate2' />
            </div>
            <p>
              <FormattedMessage id='activate3' /> <span>Apr.29th 21:00</span>-
              <span>May.04th 21:00</span>
            </p>
            <div className='step_action'>
              <div className='step_myaccount'>
                <p>
                  <span>
                    <FormattedMessage
                      id='activate4'
                      values={{ coin: 'iBLACK' }}
                    />
                  </span>{' '}
                  <span>{formatAmount(iblack_balance)} iBLACK</span>
                </p>{' '}
                <p>
                  <span>
                    <FormattedMessage id='activate10' />
                  </span>{' '}
                  <span>{formatAmount(busd_balance)} BUSD</span>
                </p>
              </div>
              <div className='rewardDetail'>
                <div>
                  <p>
                    <span>
                      <FormattedMessage
                        id='activate4'
                        values={{ coin: 'iBLACK' }}
                      />
                    </span>
                    <span>{formatAmount(iblack_balance)} iBLACK</span>
                  </p>{' '}
                  <p>
                    <span>
                      <FormattedMessage id='activate9' />
                    </span>
                    <span>{formatAmount(iblack_balance)} BLACK</span>
                  </p>{' '}
                  <p>
                    <span>
                      <FormattedMessage id='activate8' />
                    </span>
                    <span>{formatAmount(exercise_amount)} BUSD</span>
                  </p>
                </div>
              </div>
              {chainId !== ChainId.BSC ? (
                <Button className='getReward'>
                  <FormattedMessage id='activate5' />
                </Button>
              ) : active ? (
                <Button
                  className='getReward'
                  loading={loading}
                  onClick={onActivate}
                >
                  <FormattedMessage id='activate6' />
                </Button>
              ) : (
                <Button className='getReward' onClick={onConnect}>
                  <FormattedMessage id='activate7' />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connect((store) => ({
  changeNetworkFlag: store.popup.changeNetworkFlag,
}))(withRouter(Activate))
