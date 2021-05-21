import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import { useWeb3React } from '@web3-react/core'
import { connectWallet } from '../../../utils'
import { injected } from '../../../connectors'
import OLD from '../../../assets/image/burn/old@2x.png'
import NEW from '../../../assets/image/burn/new@2x.png'

const Burn = (props) => {
  const { dispatch } = props
  const { activate, deactivate } = useWeb3React()

  useEffect(() => {
    window.document.getElementById('container').style.display = 'none'
  }, [])

  return (
    <>
      <div className='burn_box'>
        <div className='content'>
          <h2 className='burn_box_title'>BlackHole Burn</h2>
          <p className='burn_box_content'>
            毁灭的意义，是为了重建，与新生，这就是生命哲学里面的「螺旋上升，或大起大落」的时间曲线，巨大的伤害，会让你粉身碎骨，但是，「我相信最为精彩的应该是，重建之时的信心，与勇气。」
          </p>
          <div className='burn_box_card_box'>
            <div className='burn_box_card'>
              <img className='burn_box_card_old_logo' src={OLD} />
              <img className='burn_box_card_new_logo' src={NEW} />
              <h3 className='burn_box_card_title'>BlackHole Burning</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Burn)
