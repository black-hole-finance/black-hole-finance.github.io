import React from "react";
import {SWITCH_NETWORK_POPUP} from "../../../const";
import {ChainId, ChainIdName} from "../../../constants";
import {connect} from "react-redux";
import ETH from "../../../assets/image/icon/ETH@2x.png";
import HECO from "../../../assets/image/icon/HECO@2x.png";
import BSC from "../../../assets/image/icon/BSC@2x.png";
import {useActiveWeb3React} from "../../../hooks";
import './index.less'

function SwitchNetworkBtn({dispatch, staticView = false}) {
    const {chainId} = useActiveWeb3React()
    const chainIdIcon = {
        [ChainId.ETH]: ETH,
        [ChainId.HECO]: HECO,
        [ChainId.BSC]: BSC
    }[chainId]
    if (!chainIdIcon) {
        return null
    }
    const btnClick = () => {
        if (staticView) {
            return
        }
        dispatch({
            type: 'HANDLE_SHOW_MENUMASK_MODAL',
            payload: false,
        })
        dispatch({
            type: SWITCH_NETWORK_POPUP,
            payload: true,
        })
    }
    return (
        chainIdIcon && <div className='switch_network_btn' onClick={btnClick}>
            <img src={chainIdIcon} alt=""/>
            {ChainIdName[chainId]}
        </div>
    )
}

export default connect()(SwitchNetworkBtn)