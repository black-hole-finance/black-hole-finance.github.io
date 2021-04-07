import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import { SCAN_ADDRESS } from '../constants'
import { injected } from '../connectors'
import { store } from '../store'
import { connect } from 'react-redux'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

export function getScanLink(chainId, data, type) {
  const prefix = SCAN_ADDRESS[chainId]
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export function connectWallet(activate, connector, deactivate) {
  return new Promise((reslove, reject) => {
    activate(connector, undefined, true)
      .then((e) => {
        if (window.ethereum.on) {
          // 监听钱包事件
          console.log('注册事件')
          // const { ethereum } = window
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
              //无账号，则代表锁定了,主动断开
              deactivate()
            }
          })

          window.ethereum.on('disconnect', () => {
            // 断开连接
            deactivate()
          })

          window.ethereum.on('close', () => {
            // 断开连接
            deactivate()
          })

          window.ethereum.on('message', (e) => {
            console.log('message', e)
          })

          window.ethereum.on('networkChanged', () => {
            // 链改了，刷新网页
            window.location.reload()
          })
        }
        reslove(e)
      })
      .catch((error) => {
        switch (true) {
          case error instanceof UnsupportedChainIdError:
            store.dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: true })
            console.log('链错了')
            break
          case error instanceof NoEthereumProviderError:
            console.log('不是钱包环境')
            break
          case error instanceof UserRejectedRequestError:
            console.log('用户拒绝连接钱包')
            break
          default:
            console.log('未知错误')
        }
        reject(error)
      })
  })
}
