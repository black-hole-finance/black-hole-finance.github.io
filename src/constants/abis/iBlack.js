import {Interface} from '@ethersproject/abi'
import iBlack_ABI from './iBlack.json'

const OFFERING_INTERFACE = new Interface(iBlack_ABI)

export default OFFERING_INTERFACE
export {iBlack_ABI}
