import React, {useEffect} from 'react'
import './index.less'
import MiningItem from "../../components/MiningItem";
import BlackPool from "../../../assets/image/mining/blackPool.png";
import BlackLogo from "../../../assets/image/small_logo@2x.png";
import {BLACK_ADDRESS, ChainId} from "../../../constants";
const miningList = [
  {
    name: 'Black DAO Pool',
    icon: BlackPool,
    address: '',
    abi: '',
    startTime: '',
    endTime: '',
    stakeToken: {
      address: BLACK_ADDRESS[ChainId.ETH],
      name: 'BLACK',
      icon: BlackLogo
    }
  }

]

export default function Mining() {
  useEffect(() => {
    window.document.getElementById('container').style.display = 'none'
  }, [])
  return (
    <div className="mining-page">
      <div className="mining-page-lay">
        <h1 className="mining-page-title">BlackHole Mining</h1>
        <h1 className="mining-page-desc">Blackhole Protocol originates from Ethereum network and gradually spread to Polkadot, BSC, HECO, SOL and eventually the whole blockchain world. Any user or project governor could create a burning pool by holding BLACK and old token LP to permanently burn the old Token into a new Token, thus gaining ecological vitality.</h1>
        <MiningItem/>
      </div>
    </div>
  )
}
