import React, {Fragment, useEffect, useState} from 'react'
import ConnectWallet from '../connectWallet'
import Detail from '../detail'
import { useActiveWeb3React } from '../../../hooks'

export default function Investment() {
    const {active ,library} = useActiveWeb3React()
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