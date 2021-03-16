import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import Footer from '../../layout/footer'
import './index.less'
import SketchMap from '../../../assets/image/sketch_map@2x.png'
import SmallLogoText from '../../../assets/image/small_logo_text@2x.png'

const Home = (props) => {
  return (
    <>
      <div className='home_box'>
        <div className='content'>
          <div className='home' id='Whitepaper'>
            <div className='content'>
              <h2 className='home_title'>
                <FormattedMessage id='home_text_1' />
              </h2>
              <div className='home_content'>
                <p className='home_content_text'>
                  <FormattedMessage id='home_text_2' />
                </p>
                <a className='home_sketch_map'></a>
              </div>
            </div>
          </div>
          <div className='roadmap'>
            <div className='content'>
              <h2 className='roadmap_title'>
                <FormattedMessage id='home_text_3' />
              </h2>
              <p className='roadmap_timeline'>
                <span></span>
                <span></span>
                <span></span>
              </p>
              <div className='roadmap_card'>
                <div className='roadmap_card_content'>
                  <h3>
                    <FormattedMessage id='home_text_4' />
                  </h3>
                  <h4>
                    <FormattedMessage id='home_text_4_2' />
                  </h4>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_5' />
                  </p>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_6' />
                  </p>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_7' />
                  </p>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_8' />
                  </p>
                </div>
                <div className='roadmap_card_content'>
                  <h3>
                    <FormattedMessage id='home_text_9' />
                  </h3>
                  <h4>
                    <FormattedMessage id='home_text_9_2' />
                  </h4>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_10' />
                  </p>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_11' />
                  </p>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_12' />
                  </p>
                </div>
                <div className='roadmap_card_content'>
                  <h3>
                    <FormattedMessage id='home_text_13' />
                  </h3>
                  <h4>
                    <FormattedMessage id='home_text_13_2' />
                  </h4>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_14' />
                  </p>
                  <p className='roadmap_card_text'>
                    <FormattedMessage id='home_text_14_2' />
                  </p>
                </div>
              </div>
              <a className='roadmap_png'></a>
            </div>
          </div>
        </div>
      </div>

      <div className='backed_by'>
        <div className='content'>
          <h2 className='backed_by_title'>
            <FormattedMessage id='home_text_25' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              {/* <img src='' />
            <img src='' />
            <img src='' /> */}
              <p>LOGO</p>
              <p>LOGO</p>
              <p>LOGO</p>
            </div>
            <div className='backed_by_content_box'>
              {/* <img src='' />
            <img src='' />
            <img src='' /> */}
              <p>LOGO</p>
              <p>LOGO</p>
              <p>LOGO</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withRouter(Home)
