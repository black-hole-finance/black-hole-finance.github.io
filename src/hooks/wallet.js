import {isAddress} from "../utils";
import {useContract, useMulticallContract} from "./useContract";
import {useActiveWeb3React, useBlockHeight} from "./index";
import {useEffect, useMemo, useState} from "react";
import Web3 from "web3";
import {ERC20_ABI} from "../constants/abis/erc20";

/**
 * 获取余额信息
 * @param address
 * @returns {string}
 */
export function useBalance(address){
    const {account} = useActiveWeb3React()
    const blockHeight = useBlockHeight()
    const multicallContract = useMulticallContract()
    const [balance, setBalance] = useState('0')
    useEffect(() => {
        if(account) {
            multicallContract.getEthBalance(account).then(balance => {
                setBalance(balance.toString())
            }).catch(e => {
                return 0
            })
        }
    },[account, blockHeight])
    return balance
}

/**
 * 获取token余额
 * @param address
 * @param contract
 * @returns {string}
 */
export function useTokenBalance(address){
    const {account} = useActiveWeb3React()
    const blockHeight = useBlockHeight()
    const contract = useContract(address, ERC20_ABI, false)
    const [balance, setBalance] = useState('0')
    useEffect(() => {
        if(account) {
            contract.balanceOf(account).then(balance => {
                setBalance(balance.toString())
            }).catch(e => {
                return 0
            })
        }
    },[account, blockHeight])
    return balance
}

/**
 * 获取token余额
 * @param address
 * @param contract
 * @returns {string}
 */
export function useTokenAllowance(address, token_address){
    const {account} = useActiveWeb3React()
    const blockHeight = useBlockHeight()
    const contract = useContract(token_address, ERC20_ABI, false)
    const [allowance, setAllowancee] = useState('0')
    useEffect(() => {
        console.log('111111111')
        console.log(address)
        if(address) {
            contract.allowance(account, address).then(allowance => {
                console.log('allowance', allowance)
                setAllowancee(allowance.toString())
            }).catch(e => {
                console.log(e)
                return 0
            })
        }
    },[account, address, blockHeight])
    return allowance
}