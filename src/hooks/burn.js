import { useCallback, useEffect, useState } from 'react'
import {
  BLACK_ADDRESS,
  getContract,
  MULTICALL_NETWORKS,
  LBP_ADDRESS,
  USDT_ADDRESS,
  ZERO_ADDRESS, ChainId,
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
import {getMultiCallProvider, getOnlyMultiCallProvider, processResult} from '../utils/multicall'
import { Contract } from 'ethers-multicall-x'

/**
 * 可用额度
 * @returns {array}
 */
export const useBurn = (address) => {
  const { account, chainId, active, library } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const burn_contract = useContract(address, BURN_ABI)
  const [info, setInfo] = useState({
    begin: 0,
    periodFinish: 0,
    rewards: 0,
    balanceOf: 0,
    totalSupply: 0,
    earned: 0,
    rewardsToken: null,
    stakingToken: null,
  })
  const multicallProvider = getOnlyMultiCallProvider(chainId||ChainId.HECO)
  useEffect(() => {
    const contract = new Contract(address, BURN_ABI)
    const rpcArr = [
      contract.begin(),
      contract.periodFinish(),
      contract.rewards(ZERO_ADDRESS),
      contract.totalSupply(),
    ]
    if (account) {
      rpcArr.push(
          contract.rewardsToken(),
          contract.stakingToken(),
          contract.balanceOf(account),
          contract.earned(account),
      )
    }
      multicallProvider
        .all(rpcArr)
        .then((data) => {
          data = processResult(data)
          console.log('data', data)
          const [
            begin,
            periodFinish,
            rewards,
            totalSupply,
            rewardsToken='',
            stakingToken='',
            balanceOf=0,
            earned=0,
          ] = data
          console.log('burn,data', data)
          setInfo({
            begin,
            periodFinish,
            rewards,
            totalSupply,
            rewardsToken,
            stakingToken,
            balanceOf,
            earned,
          })
        }).catch(e =>{
        console.log(e)
      })
  }, [account, blockHeight])


  const toBurn = useCallback((amount) => {
    if(!account || !active){
      return  Promise.reject('not connect wallet')
    }
    return burn_contract.stake(amount)
  }, [account, active])

  const toClaim = useCallback(() => {
    if(!account || !active){
      return  Promise.reject('not connect wallet')
    }
    return burn_contract.getReward()
  }, [account, active])

  return [info, toBurn, toClaim]
}
