import { useActiveWeb3React } from './index'
import { useMemo } from 'react'
import { getContract } from '../utils'
import { MULTICALL_NETWORKS } from '../constants'
import { MULTICALL_ABI } from '../constants/abis/multicall'

export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useMulticallContract() {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false
  )
}
