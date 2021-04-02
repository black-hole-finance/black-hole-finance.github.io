import React, { useEffect } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { useWeb3React } from '@web3-react/core'
import { ChainId, NetworkRPC } from '../constants'

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.RINKEBY, ChainId.HECO],
})

export const network = new NetworkConnector({
  urls: NetworkRPC,
  defaultChainId: ChainId.HECO,
  pollingInterval: 8000,
  requestTimeoutMs: 15000,
})

export const Web3ReactActivate = () => {
  // const { activate } = useWeb3React()
  // useEffect(() => {
  //   activate(injected).then(() => {
  //     console.log(injected, 'injected')
  //   })
  // }, [])
}
