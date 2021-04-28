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
import GateIO from '../../../assets/image/gate.io@2x.png'
import MXC from '../../../assets/image/MXC@2x.png'
import HongLian from '../../../assets/image/honglian@2x.png'
import Winkrypto from '../../../assets/image/Winkrypto@2x.png'
import HeartBit from '../../../assets/image/heart_bit@2x.png'
import NULS from '../../../assets/image/NULS@2x.png'

import BounceSmall from '../../../assets/image/Bounce_small@2x.png'
import Au21Small from '../../../assets/image/au21_small@2x.png'
import HelmetSmall from '../../../assets/image/helmet_small@2x.png'
import WeStarterSmall from '../../../assets/image/WeStarter_small@2x.png'
import BigcoiubSmall from '../../../assets/image/bigcoiub_small@2x.png'
import ChainswapSmall from '../../../assets/image/chainswap_small@2x.png'
import CryptoTimesSmall from '../../../assets/image/crypto_times_small@2x.png'
import NGCSmall from '../../../assets/image/NGC_small@2x.png'
import OasisCapitalSmall from '../../../assets/image/oasis_capital_small@2x.png'
import OxAlphaCapitalSmall from '../../../assets/image/OxAlpha_capital_small@2x.png'
import PowerLawSmall from '../../../assets/image/power_law_small@2x.png'
import ShinChanSmall from '../../../assets/image/shin_chan_small@2x.png'
import X21Small from '../../../assets/image/x21_small@2x.png'
import GateIOSmall from '../../../assets/image/gate.io_small@2x.png'
import MXCSmall from '../../../assets/image/MXC_small@2x.png'
import HongLianSmall from '../../../assets/image/honglian_small@2x.png'
import WinkryptoSmall from '../../../assets/image/Winkrypto_small@2x.png'
import HeartBitSmall from '../../../assets/image/heart_bit_small@2x.png'
import NULSSmall from '../../../assets/image/NULS_small@2x.png'

const Home = (props) => {
  useEffect(() => {
    window.document.getElementById('container').style.display = ''
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
              {/* <span className='line'></span> */}
              <img src={PowerLaw} />
              {/* <span className='line'></span> */}
              <img src={Au21} />
            </div>
            <div className='backed_by_content_box'>
              <img src={X21} />
              {/* <span className='line'></span> */}
              <img src={ShinChan} />
              {/* <span className='line'></span> */}
              <img src={OasisCapital} />
            </div>
            <div className='backed_by_content_box'>
              <img src={CryptoTimes} />
              {/* <span className='line'></span> */}
              <img src={OxAlphaCapital} />
              {/* <span className='line'></span> */}
              <img src={Bigcoiub} />
            </div>
            <div className='backed_by_content_box'>
              <img src={GateIO} />
              {/* <span className='line'></span> */}
              <img src={MXC} />
              {/* <span className='line'></span> */}
              <img src={HongLian} />
            </div>
            <div className='backed_by_content_box'>
              <img src={Winkrypto} />
              {/* <span className='line'></span> */}
              <img src={HeartBit} />

              {/*占位*/}
              <>
                <span className='line' style={{ visibility: 'hidden' }}></span>
                <img style={{ visibility: 'hidden' }} />
              </>
            </div>
          </div>
        </div>
        <div className='content'>
          <h2 className='backed_by_title backed_by_title_support'>
            <FormattedMessage id='home_text_26' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              <img src={Bounce} />
              {/* <span className='line'></span> */}
              <img src={WeStarter} />
              {/* <span className='line'></span> */}
              <img src={Helmet} />
            </div>
            {/* backed_by_content_box_footer */}
            <div className='backed_by_content_box'>
              <img src={Chainswap} />
              {/* <span className='line'></span> */}
              <img src={NULS} />
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
              <img src={NGCSmall} />
              {/* <span className='line'></span> */}
              <img src={PowerLawSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={X21Small} />
              {/* <span className='line'></span> */}
              <img src={Au21Small} />
            </div>
            <div className='backed_by_content_box'>
              <img src={ShinChanSmall} />
              {/* <span className='line'></span> */}
              <img src={OasisCapitalSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={CryptoTimesSmall} />
              {/* <span className='line'></span> */}
              <img src={OxAlphaCapitalSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={BigcoiubSmall} />
              {/* <span className='line'></span> */}
              <img src={GateIOSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={MXCSmall} />
              {/* <span className='line'></span> */}
              <img src={HongLianSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={WinkryptoSmall} />
              {/* <span className='line'></span> */}
              <img src={HeartBitSmall} />
            </div>
          </div>
        </div>
        <div className='content'>
          <h2 className='backed_by_title backed_by_title_support'>
            <FormattedMessage id='home_text_26' />
          </h2>
          <div className='backed_by_content'>
            <div className='backed_by_content_box'>
              <img src={BounceSmall} />
              {/* <span className='line'></span> */}
              <img src={WeStarterSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={HelmetSmall} />
              {/* <span className='line'></span> */}
              <img src={ChainswapSmall} />
            </div>
            <div className='backed_by_content_box'>
              <img src={NULSSmall} />
              {/* <span className='line'></span> */}
              {/*占位*/}
              <>
                <span className='line' style={{ visibility: 'hidden' }}></span>
                <img style={{ visibility: 'hidden' }} />
              </>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withRouter(Home)
