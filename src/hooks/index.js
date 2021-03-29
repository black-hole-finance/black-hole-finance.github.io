import {
  UnsupportedChainIdError,
  useWeb3React as useWeb3ReactCore,
} from '@web3-react/core'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { injected } from '../connectors'
import { getContract } from '../constants'
import { store } from '../store'
import offering from '../constants/abis/offering.json'
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector'
import { connectWallet } from '../utils'
import {useQuota, useUnlocked, useVolume} from "./offering";

export const useActiveWeb3React = () => {
  const context = useWeb3ReactCore()
  // 暂时无需使用json rpc
  return context
  // const contextNetwork = useWeb3ReactCore()
  // return context.active ? context : contextNetwork
}

/**
 * 连接钱包
 * @returns {boolean}
 */
export function useEagerConnect() {
  const { activate, deactivate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)
  useEffect(() => {
    // 如果已经验证过的话，直接链接
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        connectWallet(activate, injected, deactivate)
          .then(() => {
            console.log('连接成功')
          })
          .catch(() => {
            setTried(true)
          })
      } else {
        // 如果是手机前钱包，尝试直接链接
        if (isMobile && window.ethereum) {
          connectWallet(activate, injected, deactivate)
            .then(() => {
              console.log('连接成功')
            })
            .catch(() => {
              setTried(true)
            })
        } else {
          //其他情况
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

export function useBlockHeight() {
  const { account, active, library } = useActiveWeb3React()
  const [blockNumber, setBlockNumber] = useState(0)

  const updateBlockNumber = (blockNumber) => {
    setBlockNumber(blockNumber)
  }

  useEffect(() => {
    library && library.once('block', updateBlockNumber)
    return () => {
      library && library.off('block', updateBlockNumber)
    }
  }, [blockNumber, library])

  return blockNumber
}