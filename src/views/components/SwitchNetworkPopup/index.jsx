import React from 'react'
import {useActiveWeb3React} from '../../../hooks'
import BSC from '../../../assets/image/icon/BSC@2x.png'
import HECO from '../../../assets/image/icon/HECO@2x.png'
import {changeNetwork} from "../../../utils/index";
import {ChainId} from "../../../constants/index"
import {FormattedMessage} from 'react-intl'
import ETH from "../../../assets/image/icon/ETH@2x.png";
import {BinanceLogo, HecoLogo} from "../../../assets/js/svgData";
import '../ChangeNetworkPopup/index.less'
import './index.less'
import CLOSE from "../../../assets/image/icon/close.png";

export default function SwitchNetworks({onClose}) {
    const {chainId} = useActiveWeb3React()
    const initChainId = chainId || ChainId.HECO
    const onChangeNetWork = (_chainId) => {
        changeNetwork(_chainId).then(() => {
            // TODO 关闭窗口
            onClose()
        })
    }
    return (
        <div className='wallet_connect'>
            <div className='choose_network_box_header'>
                <FormattedMessage id='linkWallet'/>
            </div>
            <div className='choose_network_box'>
                <div className={`choose-network`}>
                    <p className={`${initChainId == ChainId.ETH ? 'active' : ''}`} onClick={() => {
                        onChangeNetWork(ChainId.ETH)
                    }}>
                        <img src={ETH}/>
                        <span>Ethereum</span>
                        <HecoLogo/>
                    </p>
                    <p className={`${initChainId == ChainId.BSC ? 'active' : ''}`} onClick={() => {
                        onChangeNetWork(ChainId.BSC)
                    }}>
                        <img src={BSC}/>
                        <span>Binance</span>
                        <BinanceLogo/>
                    </p>
                    <p className={`${initChainId == ChainId.HECO ? 'active' : ''}`} onClick={() => {
                        onChangeNetWork(ChainId.HECO)
                    }}>
                        <img src={HECO}/>
                        <span>Heco</span>
                        <HecoLogo/>
                    </p>
                </div>
            </div>
            <img src={CLOSE} className='choose_network_close_btn' alt="" onClick={onClose}/>
        </div>
    )
}