import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'
import {Contract} from "@ethersproject/contracts";
import {SCAN_ADDRESS} from "../constants";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value){
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

export function getContract(address, ABI, library, account){
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// account is not optional
export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
}

export function getScanLink(chainId, data, type) {
    const prefix = SCAN_ADDRESS[chainId]
    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        case 'block': {
            return `${prefix}/block/${data}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${data}`
        }
    }
}