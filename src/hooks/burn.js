import {useCallback, useEffect, useState} from 'react'
import {
  BLACK_ADDRESS,
  getContract,
  MULTICALL_NETWORKS,
  LBP_ADDRESS,
  USDT_ADDRESS, ZERO_ADDRESS,
} from '../constants'
import { POPUP_LOADING_FLAG } from '../const'
import offering from '../constants/abis/offering.json'
import { store } from '../store'
import { useActiveWeb3React, useBlockHeight } from './index'
import { useContract } from './useContract'
import { formatAmount, fromWei } from '../utils/format'
import Web3 from 'web3'
import { useBalance, useTokenBalance } from './wallet'
import { BURN_ABI } from '../constants/abis/burn'
import {getMultiCallProvider, processResult} from "../utils/multicall";
import {Contract} from "ethers-multicall-x";

/**
 * 可用额度
 * @returns {string}
 */
export const useBurn = (address) => {
  const { account, chainId, active, library } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const [info, setInfo] = useState({
    begin: 0,
    periodFinish: 0,
    rewards: 0,
    balanceOf: 0,
    totalSupply: 0,
    earned: 0,
    rewardsToken: ZERO_ADDRESS,
    stakingToken: ZERO_ADDRESS
  });
  const multicallProvider = getMultiCallProvider(library, chainId)
  useEffect(() => {
    const contract = new Contract(address, BURN_ABI)
    if (account) {
      multicallProvider.all([
        contract.begin(),
        contract.periodFinish(),
        contract.rewards(ZERO_ADDRESS),
        contract.balanceOf(account),
        contract.totalSupply(),
        contract.earned(account),
        contract.rewardsToken(),
        contract.stakingToken(),
      ]).then(data => {
        data = processResult(data)
        const [
          begin,
          periodFinish,
          rewards,
          balanceOf,
          totalSupply,
          earned,
          rewardsToken,
          stakingToken
        ] = data
        setInfo({
          begin,
          periodFinish,
          rewards,
          balanceOf,
          totalSupply,
          earned,
          rewardsToken,
          stakingToken
        })
      })

    }
  }, [account, blockHeight])
  return info
}