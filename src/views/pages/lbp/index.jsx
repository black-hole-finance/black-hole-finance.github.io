import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import BigNumber from 'bignumber.js'
import { withRouter } from 'react-router'
import {useLBP} from "../../../hooks/lbp";
import {connect} from "react-redux";
import {getContract, LBP_ADDRESS, OFFERING_ADDRESS} from "../../../constants";
import Offering from "../../../constants/abis/offering.json";
import {useActiveWeb3React} from "../../../hooks";
import {LBP_ABI} from "../../../constants/abis/lbp";
import {numToWei} from "../../../utils/format";

const LBP = (props) => {
  const { active, chainId, library, account } = useActiveWeb3React()

  useLBP()
  const {start_at, end_at, price, status, balance} = props.info;
  console.table(props.info)

  const [amount, setAmount] = useState()
  let slippageVal // 滑点

  // 募资事件
  const onPurchase = async () => {
    const lbp_contract = getContract(
      library,
      LBP_ABI,
      LBP_ADDRESS[chainId]
    )
    const strapOut = await lbp_contract.methods
      .getStrapOut(numToWei(amount))
      .call({ from: account })

    let minOut = new BigNumber(strapOut)
      .multipliedBy(
        new BigNumber(100)
          .minus(new BigNumber(slippageVal))
          .dividedBy(new BigNumber(100))
      )
      .toString()
    return lbp_contract.methods
      .strap(minOut)
      .send({
        from: account,
        value: numToWei(amount)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        // TODO
      })
  }


  return (
    <>
      {/*表单内容*/}
    </>
  )
}

export default connect((store) => ({
  info: store.lbp.info,
}))(withRouter(LBP))