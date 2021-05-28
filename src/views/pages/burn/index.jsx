import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import Footer from '../../layout/footer'
import { connect } from 'react-redux'
import BurnCard from '../../components/burn/burnCard'
import comingSoon from '../../../assets/image/burn/comingSoon@2x.png'

const Burn = (props) => {
  const { dispatch } = props

  useEffect(() => {
    dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
    window.document.getElementById('container').style.display = 'none'
  }, [])

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
