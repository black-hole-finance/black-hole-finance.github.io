import React, {useState} from "react";
import BlackPool from "../../../assets/image/mining/blackPool.png";
import {FormattedMessage} from "react-intl";
import {Button, message} from "antd";
import CopyIcon from '../../../assets/image/icon/copy@2x (2).png'
import MetamaskLogo from '../../../assets/image/icon/metamask.png'
import {BLACK_ADDRESS, ChainId} from "../../../constants";
import './index.less'
import {useActiveWeb3React} from "../../../hooks";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import LOGO from '../../../assets/image/small_logo@2x.png'

export default function MiningItem(){
  const {chainId, account, library} = useActiveWeb3React()
  const [stakeValue, setStakeValue] = useState('')
  const [withdrawValue, setWithdrawValue] = useState('')

  const addTokenToWallet = async () => {
    try {
      let addTokenClick = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: BLACK_ADDRESS[chainId || ChainId.ETH],
            symbol: 'BLACK',
            decimals: 18,
            image: LOGO,
          },
        },
      })
      if (addTokenClick) {
        message.success('add success')
      }
    } catch (err) {
      console.log(err, 'addToken')
    }
  }

  return (
    <div className="mining-pool">
      <div className="mining-pool-title">
        <div>
          <img src={BlackPool} alt=""/>
          <div>
            <span>BLACK Pool</span>
            <div className="apy-h5">
              <div className="apy-text">APY</div>
              <div>100.23%</div>
            </div>
          </div>
        </div>
        <div className="apy-pc">
          <div>100.23%</div>
          <div className="apy-text">APY</div>
        </div>
      </div>
      <div className="mining-pool-main">
        <div className="pool-line-h5" style={{marginTop: 0}}/>
        <div className="mining-pool-main-box">
          <div className="pool-stake">
            <div className="pool-l-r">
              <div><FormattedMessage id="Available"/></div>
              <div>0.001 BLACK</div>
            </div>
            <div className='input-box'>
              <input
                style={{ background: '#fff' }}
                value={stakeValue}
                onChange={e => setStakeValue(e.target.value)}
                placeholder='Input Stake Value'
                className="input"
              />
              <div className="max-btn">
                <FormattedMessage id='warLBP8' />
              </div>
            </div>
            <Button type="primary" className="pool-btn">
              <FormattedMessage id="StakeMining" />
            </Button>
            <div className="pool-l-r mt12">
              <div><FormattedMessage id="MyStake"/></div>
              <div>0.001 BLACK</div>
            </div>
            <div className="pool-l-r mt12">
              <div><FormattedMessage id="TotalStake"/></div>
              <div>0.001 BLACK</div>
            </div>
            <div className="pool-l-r mt12">
              <div><FormattedMessage id="MyPoolShare"/></div>
              <div>0.1%</div>
            </div>
            <div className="pool-l-r mt12 add-token">
              <CopyToClipboard
                text={BLACK_ADDRESS[chainId || ChainId.ETH]}
                onCopy={() => {
                  message.success('copy success')
                }}
              >
                <div>
                  BLACK <FormattedMessage id="ContractAdd"/>
                  <img src={CopyIcon} alt=""/>
                </div>
              </CopyToClipboard>
              <div onClick={addTokenToWallet}>
                <FormattedMessage
                  id='burn17'
                  values={{ token: 'BLACK' }}
                />
                <img src={MetamaskLogo} alt=""/>
              </div>
            </div>
          </div>
          <div className="pool-line" />
          <div className="pool-line-h5"/>
          <div className="pool-withdraw">
            <div className="pool-l-r">
              <div><FormattedMessage id="Withdraw"/></div>
              <div>0.0014</div>
            </div>
            <div className='input-box'>
              <input
                style={{ background: '#fff' }}
                value={withdrawValue}
                onChange={e => setWithdrawValue(e.target.value)}
                placeholder='Input Withdraw Value'
                className="input"
              />
              <div className="max-btn">
                <FormattedMessage id='warLBP8' />
              </div>
            </div>
            <Button type="primary" className="pool-btn">
              <FormattedMessage id="WithdrawReward" />
            </Button>
            <div className="pool-l-r mt12 mb12">
              <div>BLACK<FormattedMessage id="Rewards"/></div>
              <div>0.0014</div>
            </div>
            <Button type="primary" className="pool-btn">
              <FormattedMessage id="GetReward" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
