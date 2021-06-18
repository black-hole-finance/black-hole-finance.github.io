import React, {useContext, useEffect, useState} from 'react'
import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {useActiveWeb3React} from '../../../../hooks'
import {FormattedMessage} from 'react-intl'
import {useConnectWallet} from '../../../../utils'
import {injected, walletChange} from '../../../../connectors'
import BSC from '../../../../assets/image/icon/BSC@2x.png'
import HECO from '../../../../assets/image/icon/HECO@2x.png'
import ETH from '../../../../assets/image/icon/ETH@2x.png'
import CLOSE from '../../../../assets/image/icon/close.png'
import metamask from '../../../../assets/image/icon/metamask.png'
import walletConnect from '../../../../assets/image/icon/walletConnect.png'
import './index.less'
import {ChainId, walletConnector} from '../../../../constants/index'
import {BinanceLogo, HecoLogo} from "../../../../assets/js/svgData";
import {HANDLE_WALLET_MODAL} from  '../../../../const'

const WalletConnect = (props) => {
    const connectWallet = useConnectWallet()
    const {
        active,
        chainId,
        account,
        activate,
        deactivate,
    } = useActiveWeb3React()
    const {dispatch, changeNetworkFlag} = props
    const initChainId = chainId || ChainId.HECO
    const [netWorkFlag, setNetWorkFlag] = useState(initChainId)

    useEffect(() => {
        // window.document.getElementById('container').style.display = 'none'
    }, [])

    const connectMetamaskWalletClick = () => {
        connectWallet(injected, netWorkFlag).then(() => {
            dispatch({
                type: HANDLE_WALLET_MODAL,
                walletModal: null,
            })
        })
    }

    const connectWalletClick = () => {
        connectWallet(walletConnector[netWorkFlag]).then(() => {
            dispatch({
                type: HANDLE_WALLET_MODAL,
                walletModal: null,
            })
        })
    }
    const selectNetWork = (_chainId) => {
        setNetWorkFlag(_chainId)
    }
    return (
        <div className='wallet_connect'>
            <div className='choose_network_box_header'>
                <FormattedMessage id='linkWallet'/>
            </div>
            <div className='choose_network_box'>
                <p className='choose_network_title'>
                    <FormattedMessage id='netWork1'/>
                </p>
                <div className={`choose-network`}>
                    <p className={`${netWorkFlag == ChainId.ETH ? 'active' : ''}`} onClick={() => {selectNetWork(ChainId.ETH)}}>
                        <img src={ETH}/>
                        <span>Ethereum</span>
                        <HecoLogo/>
                    </p>
                    <p className={`${netWorkFlag == ChainId.BSC ? 'active' : ''}`} onClick={() => {selectNetWork(ChainId.BSC)}}>
                        <img src={BSC}/>
                        <span>BSC</span>
                        <BinanceLogo/>
                    </p>
                    <p className={`${netWorkFlag == ChainId.HECO ? 'active' : ''}`} onClick={() => {selectNetWork(ChainId.HECO)}}>
                        <img src={HECO}/>
                        <span>Heco</span>
                        <HecoLogo/>
                    </p>
                </div>
            </div>

            <p className='choose_network_title'>
                <FormattedMessage id='netWork2'/>
            </p>
            <div className='wallet_connect_metamask'>
                <div onClick={connectMetamaskWalletClick} className='wallet_connect_metamask_item'>
                    <img src={metamask}/>
                </div>
                <div onClick={connectWalletClick} className='wallet_connect_metamask_item'>
                    <img src={walletConnect}/>
                </div>
            </div>
            <img src={CLOSE} className='choose_network_close_btn' alt="" onClick={props.onClose}/>
        </div>
    )
}

export default connect((store) => ({
    changeNetworkFlag: store.popup.changeNetworkFlag,
}))(withRouter(WalletConnect))
