import {isAddress} from "../utils";
import {useMulticallContract} from "./useContract";
import {useActiveWeb3React} from "./index";
import {useMemo, useState} from "react";
import Web3 from "web3";

export function useBalance(address){
    const {account} = useActiveWeb3React()
    const multicallContract = useMulticallContract()
    const [balance, setBalance] = useState(0)
    useMemo(() => {
        let balance = 0
        if(account) {
            multicallContract.getEthBalance(account).then(data => {
                setBalance(data.toString())
            }).catch(e => {
                return 0
            })
        }
        return balance
    },[account])
    return balance
}