import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from 'web3'

export function getContract(library, abi, address) {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const NetworkContextName = 'NETWORK'
export const ChainId = {
  RINKEBY: 4,
  ETH: 1,
  BSC: 56,
}

export const NetworkRPC = {
  [ChainId.RINKEBY]:
    'https://rinkeby.infura.io/v3/3adb5694c0e04bd29683f9e4c5f4c458',
  [ChainId.ETH]: 'https://http-testnet.hecochain.com',
}

export const SCAN_ADDRESS = {
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
  [ChainId.ETH]: 'https://etherscan.io/',
  [ChainId.BSC]: 'https://bscscan.com/',
}

export const MULTICALL_NETWORKS = {
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.ETH]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.BSC]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
}

export const OFFERING_ADDRESS = {
  [ChainId.RINKEBY]: '0xA9ce26a7F2a206D165c0Aff83BbCdF81fd4B489E',
  [ChainId.ETH]: '0xA9ce26a7F2a206D165c0Aff83BbCdF81fd4B489E',
}

export const LBP_ADDRESS = {
  [ChainId.RINKEBY]: '0x0887C530037ad6798C943988835576a651Ff5F64',
  [ChainId.ETH]: '0x3E0c8881CCb875b5257D800BE6ED33e06F500773',
}

export const USDT_ADDRESS = {
  [ChainId.RINKEBY]: '0xF0d0F0Bc954123FE38172CC87b7BE923bf6e89EB',
  [ChainId.ETH]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
}

export const BLACK_ADDRESS = {
  [ChainId.RINKEBY]: '0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2',
  [ChainId.ETH]: '0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2',
  [ChainId.BSC]: '0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2',
}

export const iBLACK_ADDRESS = {
  [ChainId.BSC]: '0x04adbE36C4D39e6EC799F69906A48d83F88dC268'
}

export const BUSD_ADDRESS = {
  [ChainId.BSC]: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
}

export const OPTION_FACTORY_ADDRESS = {
  [ChainId.BSC]: '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
}