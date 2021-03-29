import {Interface} from '@ethersproject/abi'
import OFFERING_ABI from './offering.json'

const OFFERING_INTERFACE = new Interface(OFFERING_ABI)

export default OFFERING_INTERFACE
export {OFFERING_ABI}
