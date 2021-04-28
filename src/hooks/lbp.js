import { useEffect, useState } from 'react'
import {
  BLACK_ADDRESS,
  getContract,
  MULTICALL_NETWORKS,
  LBP_ADDRESS,
  USDT_ADDRESS,
} from '../constants'
import { POPUP_LOADING_FLAG } from '../const'
import offering from '../constants/abis/offering.json'
import { store } from '../store'
import { useActiveWeb3React, useBlockHeight } from './index'
import { useContract } from './useContract'
import { formatAmount, fromWei } from '../utils/format'
import Web3 from 'web3'
import { useBalance, useTokenBalance } from './wallet'
import { LBP_ABI } from '../constants/abis/lbp'

/**
 * 可用额度
 * @returns {string}
 */
export const useBegin = () => {
  const { account, chainId, active } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(chainId && LBP_ADDRESS[chainId], LBP_ABI, false)
  const [begin, setBegin] = useState('')
  useEffect(() => {
    if (account && contract) {
      contract.begin().then((val) => {
        setBegin(val.toString())
      })
    }
  }, [account, blockHeight])
  return begin
}

/**
 * 可用额度
 * @returns {string}
 */
export const useSpan = () => {
  const { account, chainId, active } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(chainId && LBP_ADDRESS[chainId], LBP_ABI, false)
  const [span, setSpan] = useState('')
  useEffect(() => {
    if (account && contract) {
      contract.span().then((val) => {
        setSpan(val.toString())
      })
    }
  }, [account, blockHeight])
  return span
}

/**
 * 可用额度
 * @returns {string}
 */
export const usePrice = () => {
  const { account, chainId, active } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
  const contract = useContract(chainId && LBP_ADDRESS[chainId], LBP_ABI, false)
  const [price, setPrice] = useState('0')
  useEffect(() => {
    if (account && contract) {
      contract.priceLBP().then((val) => {
        setPrice(val.toString())
      })
    }
  }, [account, blockHeight])
  return price
}

/**
 *
 */
export const useLBP = () => {
  const { account, active, library } = useActiveWeb3React()
  const info = Object.assign(store.getState().lbp.info)
  const begin = useBegin()
  const span = useSpan()
  const price = usePrice()
  const balance = useBalance(account)
  useEffect(() => {
    const now = parseInt(Date.now() / 1000)
    if (account && library) {
      // 连上钱包了，赋值
      Object.assign(info, {
        start_at: begin * 1,
        end_at: begin * 1 + span * 1,
        price,
        balance,
        ratio: `1${info.underlying.symbol}= ${formatAmount(price)}${
          info.currency.symbol
        }`,
      })
    }

    let { start_at, end_at, status } = info

    if (start_at < now) {
      status = 1
    }

    if (end_at < now) {
      status = 3 // 结束
    }

    store.dispatch({
      type: 'LBP_INFO',
      payload: Object.assign(info, {
        status,
      }),
    })
  }, [begin, span, price, balance])
}
