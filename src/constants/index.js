import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from 'web3'

export function getContract(library, abi, address) {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const NetworkContextName = 'NETWORK'
export const ChainId = {
  ETH: 1,
  ROPSTEN: 3,
  HECO: 128,
}

export const NetworkRPC = {
  [ChainId.ROPSTEN]:
    'https://ropsten.infura.io/v3/3adb5694c0e04bd29683f9e4c5f4c458',
  [ChainId.HECO]: 'https://http-testnet.hecochain.com\n',
}

export const SCAN_ADDRESS = {
  [ChainId.ROPSTEN]: 'https://ropsten.etherscan.io',
  [ChainId.HECO]: 'https://hecoinfo.com',
}

export const MULTICALL_NETWORKS = {
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.HECO]: '0xc9a9F768ebD123A00B52e7A0E590df2e9E998707',
  [ChainId.ETH]: '0x5e227AD1969Ea493B43F840cfF78d08a6fc17796',
}
