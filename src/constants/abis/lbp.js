import {Interface} from '@ethersproject/abi'
import LBP_ABI from './lbp.json'

const OFFERING_INTERFACE = new Interface(LBP_ABI)

export default OFFERING_INTERFACE
export {LBP_ABI}
