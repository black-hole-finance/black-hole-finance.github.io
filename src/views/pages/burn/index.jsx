import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import { message } from 'antd'
import { injected } from '../../../connectors'
import { formatAmount } from '../../../utils/format'
import Footer from '../../layout/footer'
import { useActiveWeb3React } from '../../../hooks'
import { useTokenBalance, useTokenAllowance } from '../../../hooks/wallet'
import ERC20 from '../../../constants/abis/erc20.json'
import { BLACK_ADDRESS, getContract } from '../../../constants'
import { connect } from 'react-redux'
import BurnCard from '../../components/burn/burnCard'
import comingSoon from '../../../assets/image/burn/comingSoon@2x.png'
import { useBurn } from '../../../hooks/burn'

const Burn = (props) => {
  const address = '0x494DEdee44af333628BBC8B860dfE7576E78d878'
  const burn = useBurn(address)
  const { stakingToken } = burn
  const { dispatch } = props
  const { active, chainId, library, account } = useActiveWeb3React()
  const [amount, setAmount] = useState('')
  const [loadFlag, setLoadFlag] = useState(false)
  const [approve, setApprove] = useState(true)
  const [left_time, setLeft_time] = useState(0)
  const OldBalance = useTokenBalance(stakingToken)
  const allowance = useTokenAllowance(
    // 燃烧池子地址
    address,
    BLACK_ADDRESS[chainId]
  )

  useEffect(() => {}, [burn])

  useEffect(() => {
    dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
    window.document.getElementById('container').style.display = 'none'
  }, [])

  useEffect(() => {
    // setLeft_time(('1621944840' - parseInt(Date.now() / 1000)) * 1000)
  }, [])

  useEffect(() => {
    if (allowance > 0) {
      setApprove(false)
    }
  }, [allowance])

  const onChange = (e) => {
    const { value } = e.target
    const re = /^[0-9]+([.|,][0-9]+)?$/g
    if (
      value === '' ||
      re.test(value) ||
      (value.split('.').length === 2 && value.slice(value.length - 1) === '.')
    ) {
      setAmount(value)
    }
  }

  const onMax = () => {
    let max = OldBalance
    setAmount(formatAmount(max, 18, 8))
  }

  const addToken = async () => {
    try {
      let addTokenClick = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x0',
            symbol: 'WAR',
            decimals: 18,
            image: '',
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

  const onApprove = (e) => {
    if (!active) {
      return false
    }
    if (loadFlag) return

    setLoadFlag(true)
    const contract = getContract(library, ERC20.abi, BLACK_ADDRESS[chainId])
    contract.methods
      .approve(
        // 燃烧池子地址
        address,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({
        from: account,
      })
      .on('receipt', (_, receipt) => {
        console.log('approve success')
        setLoadFlag(false)
        setApprove(false)
      })
      .on('error', (err, receipt) => {
        console.log('approve error', err)
        setLoadFlag(false)
      })
  }

  const onConfirm = () => {
    if (!active) {
      return false
    }
    if (!OldBalance) {
      return false
    }
    if (isNaN(parseInt(OldBalance))) {
      return false
    }
    if (!amount) {
      return false
    }
    if (isNaN(parseInt(amount))) {
      return false
    }

    if (loadFlag) return
    setLoadFlag(true)
  }

  return (
    <>
      <div className='burn_box'>
        <div className='content'>
          <h2 className='burn_box_title'>
            <FormattedMessage id='burn1' />
          </h2>
          <p className='burn_box_content'>
            <FormattedMessage id='burn2' />
          </p>
          <div className='burn_box_card_box'>
            <BurnCard />
            <div className='coming_soon'>
              <img src={comingSoon} />
              <h2>
                <FormattedMessage id='burn3' />
              </h2>
            </div>
            <div className='coming_soon'>
              <img src={comingSoon} />
              <h2>
                <FormattedMessage id='burn3' />
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default connect((store) => ({
  changeNetworkFlag: store.popup.changeNetworkFlag,
  showMenuMaskModal: store.menu.showMenuMaskModal,
}))(withRouter(Burn))
