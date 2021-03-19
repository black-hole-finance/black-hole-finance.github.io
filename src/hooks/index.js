import {
  UnsupportedChainIdError,
  useWeb3React as useWeb3ReactCore,
} from '@web3-react/core'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { injected } from '../connectors'
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector'
import { connectWallet } from '../utils'

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
  const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)
  useEffect(() => {
    // 如果已经验证过的话，直接链接
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        connectWallet(activate, injected)
          .then(() => {
            console.log('连接成功')
          })
          .catch(() => {
            setTried(true)
          })
      } else {
        // 如果是手机前钱包，尝试直接链接
        if (isMobile && window.ethereum) {
          connectWallet(activate, injected)
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

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // 切换链
        connectWallet(activate, injected)
          .then(() => {
            console.log('连接成功')
          })
          .catch((error) => {
            console.error('Failed to activate after chain changed', error)
          })
      }

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          // eat errors
          connectWallet(activate, injected)
            .then(() => {
              console.log('连接成功')
            })
            .catch((error) => {
              console.error('Failed to activate after accounts changed', error)
            })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
