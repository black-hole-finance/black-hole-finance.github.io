import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from 'web3'

export function getContract(library, abi, address) {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const NetworkContextName = 'NETWORK'
export const ChainId = {
  RINKEBY: 4,
  HECO: 128,
}

export const NetworkRPC = {
  [ChainId.RINKEBY]:
    'https://rinkeby.infura.io/v3/3adb5694c0e04bd29683f9e4c5f4c458',
  [ChainId.HECO]: 'https://http-testnet.hecochain.com',
}

export const SCAN_ADDRESS = {
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
  [ChainId.HECO]: 'https://hecoinfo.com',
}

export const MULTICALL_NETWORKS = {
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.HECO]: '0xc9a9F768ebD123A00B52e7A0E590df2e9E998707',
}

export const OFFERING_ADDRESS = {
  [ChainId.RINKEBY]: '0xA9ce26a7F2a206D165c0Aff83BbCdF81fd4B489E',
  [ChainId.HECO]: '',
}

export const USDT_ADDRESS = {
  [ChainId.RINKEBY]: '0xF0d0F0Bc954123FE38172CC87b7BE923bf6e89EB',
  [ChainId.HECO]: '0xa71edc38d189767582c38a3145b5873052c3e47a',
}

export const BLACK_ADDRESS = {
  [ChainId.RINKEBY]: '0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2',
  [ChainId.HECO]: '',
}
