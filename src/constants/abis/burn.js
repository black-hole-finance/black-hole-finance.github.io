import {Interface} from '@ethersproject/abi'
import BURN_ABI from './burn.json'

const BURN_INTERFACE = new Interface(BURN_ABI)

export default BURN_INTERFACE
export {BURN_ABI}
