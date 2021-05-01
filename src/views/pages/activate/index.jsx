import React, {Fragment, useState} from "react";
import './index.less'
import {useActivate} from "./hook";
import {formatAmount} from "../../../utils/format";
import {Button, message} from "antd";
import {
  BUSD_ADDRESS,
  getContract,
  iBLACK_ADDRESS,
  OFFERING_ADDRESS,
  OPTION_FACTORY_ADDRESS,
  USDT_ADDRESS
} from "../../../constants";
import {useActiveWeb3React} from "../../../hooks";
import {iBlack_ABI} from "../../../constants/abis/iBlack";
import ERC20 from "../../../constants/abis/erc20.json";
import {connectWallet} from "../../../utils";
import {injected} from "../../../connectors";
const Activate = props => {

  const {
    active,
    chainId,
    library,
    account,
    activate,
    deactivate,
  } = useActiveWeb3React()
  const data = useActivate()
  const [loading, setLoading] = useState(false);
  const {busd_allowance, busd_balance, exercise_amount, iblack_balance} = data

  const onConnect = () => {
    if (!active) {
      connectWallet(activate, injected, deactivate)
    }
  }

  const onActivate = (e) => {
    if(loading) {
      return false
    }

    if (!active) {
      connectWallet(activate, injected, deactivate)
      return false
    }


    if(iblack_balance <= 0){
      message.error('Insufficient funds')
      return  false
    }

    if(exercise_amount <= 0) {
      return  false
    }


    if(busd_balance < exercise_amount){
      message.error('Insufficient funds')
      return  false
    }


    // 检查是否需要授权
    if(busd_allowance - exercise_amount  < 0) {
      onApprove(e)
      return false
    }

    // 授权过
    const contract = getContract(library, iBlack_ABI, iBLACK_ADDRESS[chainId])

    contract.methods.exercise().send({ from: account }, () => {
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
          iBLACK Activate
        </h2>
        <div className='activate_card'>
          <div className="stepThree">
            <div className="step_title">Swap IIO TOKEN</div>
            <p>You could swap BLACK during <span>Apr.29th 21:00</span>-<span>May.04th 21:00</span></p>
            <div className="step_action">
              <div className="step_myaccount"><p><span>My iBlack</span> <span>{formatAmount(iblack_balance)} iBLACK</span></p> <p>
                <span>Balance</span> <span>{formatAmount(busd_balance)} BUSD</span></p></div>
              <div className="rewardDetail">
                <div><p><span>My iBLACK</span><span>{formatAmount(iblack_balance)} iBLACK</span></p> <p>
                  <span>Swap To</span><span>{formatAmount(iblack_balance)} BLACK</span></p> <p><span>Need Pay</span><span>{formatAmount(exercise_amount)} BUSD</span>
                </p></div>
              </div>
              {
                active ? (
                  <Button className='getReward' loading={loading} onClick={onActivate}>
                    Activate
                  </Button>
                ) :
                  <Button className='getReward' onClick={onConnect}>
                    Connect Wallet
                  </Button>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Activate