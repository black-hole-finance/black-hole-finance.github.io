import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import Footer from '../../layout/footer'
import './index.less'
import Bounce from '../../../assets/image/Bounce@2x.png'
import Au21 from '../../../assets/image/au21@2x.png'
import Helmet from '../../../assets/image/helmet@2x.png'
import WeStarter from '../../../assets/image/WeStarter@2x.png'
import Metamask from '../../../assets/image/Metamask@2x.png'
import Bigcoiub from '../../../assets/image/bigcoiub@2x.png'
import Chainswap from '../../../assets/image/chainswap@2x.png'
import CryptoTimes from '../../../assets/image/crypto_times@2x.png'
import NGC from '../../../assets/image/NGC@2x.png'
import OasisCapital from '../../../assets/image/oasis_capital@2x.png'
import OxAlphaCapital from '../../../assets/image/OxAlpha_capital@2x.png'
import PowerLaw from '../../../assets/image/power_law@2x.png'
import ShinChan from '../../../assets/image/shin_chan@2x.png'
import X21 from '../../../assets/image/x21@2x.png'

const Home = (props) => {
  useEffect(() => {
    if (props.location.pathname.indexOf('investment') > -1) {
      window.document.getElementById('container').style.display = 'none'
    } else {
      window.document.getElementById('container').style.display = ''
    }
  }, [props.location.pathname])
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

      <div className='backed_by backed_by_big'>
        <div className='content'>
          <h2 className='backed_by_title'>
            <FormattedMessage id='home_text_25' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              <img src={NGC} />
              <span className='line'></span>
              <img className='polkastarter_png' src={PowerLaw} />
              <span className='line'></span>
              <img className='au_21' src={Au21} />
            </div>
            <div className='backed_by_content_box'>
              <a className='x21'></a>
              <span className='line'></span>
              <img className='shin_chan' src={ShinChan} />
              <span className='line'></span>
              <img className='trust_wallet_png' src={OasisCapital} />
            </div>
            <div className='backed_by_content_box'>
              <img src={CryptoTimes} />
              <span className='line'></span>
              <img src={OxAlphaCapital} />
              <span className='line'></span>
              <img className='trust_wallet_png' src={Bigcoiub} />
            </div>
          </div>
        </div>
        <div className='content'>
          <h2 className='backed_by_title backed_by_title_support'>
            <FormattedMessage id='home_text_25' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              <img src={Bounce} />
              <span className='line'></span>
              <img className='polkastarter_png' src={WeStarter} />
            </div>
            <div className='backed_by_content_box'>
              <img src={Helmet} />
              <span className='line'></span>
              <img src={Chainswap} />
            </div>
          </div>
        </div>
      </div>
      <div className='backed_by backed_by_small'>
        <div className='content'>
          <h2 className='backed_by_title'>
            <FormattedMessage id='home_text_25' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              <img src={NGC} />
              <span className='line'></span>
              <img className='polkastarter_png' src={PowerLaw} />
            </div>
            <div className='backed_by_content_box'>
              <img className='x21' src={X21} />
              <span className='line'></span>
              <img src={Au21} />
            </div>
            <div className='backed_by_content_box'>
              <img src={ShinChan} />
              <span className='line'></span>
              <img src={OasisCapital} />
            </div>
            <div className='backed_by_content_box'>
              <img src={CryptoTimes} />
              <span className='line'></span>
              <img className='trust_wallet_png' src={OxAlphaCapital} />
            </div>
            <div
              className='backed_by_content_box'
              style={{ justifyContent: 'left' }}
            >
              <img className='trust_wallet_png' src={Bigcoiub} />
            </div>
          </div>
        </div>
        <div className='content'>
          <h2 className='backed_by_title backed_by_title_support'>
            <FormattedMessage id='home_text_25' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              <img src={Bounce} />
              <span className='line'></span>
              <img className='polkastarter_png' src={WeStarter} />
            </div>
            <div className='backed_by_content_box'>
              <img src={Helmet} />
              <span className='line'></span>
              <img src={Chainswap} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withRouter(Home)
