import {Interface} from '@ethersproject/abi'
import OptionFactory_ABI from './optionFactory.json'

const OPTION_FACTORY_INTERFACE = new Interface(OptionFactory_ABI)

export default OPTION_FACTORY_INTERFACE
export {OptionFactory_ABI}
