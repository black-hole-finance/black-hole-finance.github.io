import {Interface} from '@ethersproject/abi'
import MULTICALL_ABI from './multicall.json'

const NULTICAL_INTERFACE = new Interface(MULTICALL_ABI)

export default NULTICAL_INTERFACE
export {MULTICALL_ABI}
