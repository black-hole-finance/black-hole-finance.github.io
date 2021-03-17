import React, { useEffect } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'

export const injected = new InjectedConnector({
  supportedChainIds: [3, 128],
})

export const Web3ReactActivate = () => {
  const { activate } = useWeb3React()
  useEffect(() => {
    activate(injected).then(() => {
      console.log(injected, 'injected')
    })
  }, [])
}
