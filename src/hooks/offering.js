import { useEffect, useState } from 'react'
import {
  BLACK_ADDRESS,
  getContract,
  MULTICALL_NETWORKS,
  OFFERING_ADDRESS,
  USDT_ADDRESS,
} from '../constants'
import { POPUP_LOADING_FLAG } from '../const'
import offering from '../constants/abis/offering.json'
import { store } from '../store'
import { useActiveWeb3React, useBlockHeight } from './index'
import { useContract } from './useContract'
import { OFFERING_ABI } from '../constants/abis/offering'
import Web3 from 'web3'
import { useTokenBalance } from './wallet'

/**
 * 可用额度
 * @returns {string}
 */
export const useQuota = () => {
  store.dispatch({
    type: 'POPUP_LOADING_FLAG',
    payload: true,
  })
  const { account, chainId, active } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(
    chainId && OFFERING_ADDRESS[chainId],
    OFFERING_ABI,
    false
  )
  const [quota, setQuota] = useState('')
  useEffect(() => {
    if (account && contract) {
      contract.getQuota(account).then((quota) => {
        store.dispatch({
          type: 'POPUP_LOADING_FLAG',
          payload: false,
        })
        setQuota(quota.toString())
      })
    }
  }, [account, blockHeight])
  return quota
}

/**
 * 获取可获得标的物的量
 * @returns {string}
 */
export const useVolume = () => {
  const { account, chainId } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(
    chainId && OFFERING_ADDRESS[chainId],
    OFFERING_ABI,
    false
  )
  const [volume, setVolume] = useState('0')
  useEffect(() => {
    if (account && contract) {
      contract.getVolume(account).then((volume) => {
        setVolume(volume.toString())
      })
    }
  }, [account, blockHeight])
  return volume
}

/**
 * 未解锁的量
 * @returns {string}
 */
export const useUnlocked = () => {
  const { account, chainId } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(
    chainId && OFFERING_ADDRESS[chainId],
    OFFERING_ABI,
    false
  )
  const [unlocked, setUnlocked] = useState('0')
  useEffect(() => {
    if (account && contract) {
      contract.unlocked(account).then((unlocked) => {
        setUnlocked(unlocked.toString())
      })
    }
  }, [account, blockHeight])
  return unlocked
}

export const useUnlockCapacity = () => {
  const { account, chainId } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(
    chainId && OFFERING_ADDRESS[chainId],
    OFFERING_ABI,
    false
  )
  const [unlockCapacity, setUnlockCapacity] = useState('0')
  useEffect(() => {
    if (account && contract) {
      contract.unlockCapacity(account).then((unlocked) => {
        setUnlockCapacity(unlocked.toString())
      })
    }
  }, [account, blockHeight])
  return unlockCapacity
}

/**
 *
 */
export const useInvestmentInfo = () => {
  const { chainId } = useActiveWeb3React()
  const quota = useQuota()
  const volume = useVolume()
  const unlockCapacity = useUnlockCapacity()
  const token_balance = useTokenBalance(BLACK_ADDRESS[chainId])
  useEffect(() => {
    store.dispatch({
      type: 'CONNECT_POOLS',
      payload: Object.assign(store.getState().pools.connectPools, {
        wallet_amount: token_balance,
        currency_allocation: quota,
        token_allocation: volume,
        cliamable_balance: unlockCapacity,
      }),
    })
  }, [quota, volume, unlockCapacity, token_balance])
}
