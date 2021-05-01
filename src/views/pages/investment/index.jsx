import React, {Fragment, useEffect, useState} from 'react'
import ConnectWallet from '../connectWallet'
import Detail from '../detail'
import { useActiveWeb3React } from '../../../hooks'
import {useInvestmentInfo} from "../../../hooks/offering";
import {message} from "antd";
import {store} from "../../../store";

export default function Investment() {
    const {active ,library, chainId} = useActiveWeb3React()
    const [flag, setFlag] = useState()

    useEffect(() => {
        setFlag(library)
    }, [library])
    return (
        <>
            {
                library ? <Detail/> : <ConnectWallet/>
            }
        </>
    )
}