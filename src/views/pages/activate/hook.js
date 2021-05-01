import { useEffect, useState } from 'react'
import {
  iBLACK_ADDRESS,
  BUSD_ADDRESS,
  OPTION_FACTORY_ADDRESS, getContract,
} from '../../../constants'
import {iBlack_ABI} from '../../../constants/abis/iBlack'
import { useActiveWeb3React, useBlockHeight } from '../../../hooks'
import { useContract } from '../../../hooks/useContract'
import { useBalance, useTokenBalance, useTokenAllowance } from '../../../hooks/wallet'
import {OptionFactory_ABI} from "../../../constants/abis/optionFactory";

/**
 * 可用额度
 * @returns {string}
 */
export const useCalcExerciseAmount = (iblack_amount) => {
  const { account, chainId, active, library} = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const [amount, setAmount] = useState('0')
  const contract = useContract(chainId && OPTION_FACTORY_ADDRESS[chainId], OptionFactory_ABI, false)
  useEffect(() => {
    if (account && contract) {
      contract['calcExerciseAmount(address,uint256)'](iBLACK_ADDRESS[chainId], iblack_amount).then((val) => {
        setAmount(val.toString())
      })
    }
  }, [account, blockHeight, active, iblack_amount])
  return amount
}

/**
 *
 */
export const useActivate = () => {
  const { account, active, library, chainId } = useActiveWeb3React()

  const [data, setData] = useState({
    iblack_balance: '0',
    busd_balance: '0',
    busd_allowance: '0',
    exercise_amount: '0'
  })

  const iblack_balance = useTokenBalance(iBLACK_ADDRESS[chainId])
  const busd_balance = useTokenBalance(BUSD_ADDRESS[chainId])
  const busd_allowance = useTokenAllowance(OPTION_FACTORY_ADDRESS[chainId], BUSD_ADDRESS[chainId])
  const exercise_amount = useCalcExerciseAmount(iblack_balance)

  useEffect(() => {
    setData({
      iblack_balance,
      busd_balance,
      busd_allowance,
      exercise_amount
    })
  }, [iblack_balance, busd_balance, busd_allowance, exercise_amount])

  return data
}
