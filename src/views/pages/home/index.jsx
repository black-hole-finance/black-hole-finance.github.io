import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import './index.less'
import SketchMap from '../../../assets/image/sketch_map@2x.png'
import SmallLogoText from '../../../assets/image/small_logo_text@2x.png'

const Home = (props) => {
  const [hoverFlag, setHoverFlag] = useState(false)
  const goDetail = (e) => {
    props.history.push(`/detail/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
  }

  return (
    <>
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
              <p className='roadmap_card_text'>
                <FormattedMessage id='home_text_14' />
              </p>
            </div>
          </div>
          <a className='roadmap_png'></a>
        </div>
      </div>
      <div className='i_do' id='IDO'>
        <div className='content'>
          <h2 className='i_do_title'>
            <FormattedMessage id='home_text_15' />
          </h2>
          <div className='enter_pool'>
            <div className='enter_pool_card'>
              <div className='enter_pool_title'>
                <p className='enter_pool_title_left'>
                  <img src={SmallLogoText} />
                </p>
                <p className='enter_pool_title_right'>
                  <FormattedMessage id='home_text_16' />
                </p>
              </div>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio'>
                  <FormattedMessage id='home_text_17' />
                  <i>0.1U=1BLACK</i>
                </p>
                <p className='enter_pool_ratio' style={{ textAlign: 'right' }}>
                  <FormattedMessage id='home_text_18' />
                  <i>XXXXXU</i>
                </p>
              </div>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio enter_pool_progress'>
                  <FormattedMessage id='home_text_19' />
                </p>
              </div>
              <div className='enter_pool_percentage'>
                <a>
                  <i
                    className='enter_pool_progress_bar'
                    style={{
                      width: '100%',
                    }}
                  ></i>
                </a>
                <p>
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </p>
              </div>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio enter_pool_access'>
                  <FormattedMessage id='home_text_20' />
                </p>
                <p
                  className='enter_pool_ratio enter_pool_access'
                  style={{ textAlign: 'right' }}
                >
                  <span className={cs('crown', 'crown-highlight')}></span>
                  <FormattedMessage id='home_text_21' />
                  <span
                    className='tips'
                    onMouseOver={() => setHoverFlag(1)}
                    onMouseOut={() => setHoverFlag(null)}
                  >
                    {hoverFlag === 1 && (
                      <i className='tips_content'>
                        <FormattedMessage id='home_text_22' />
                      </i>
                    )}
                  </span>
                </p>
              </div>
              <a
                className={cs('enter_pool_enter')}
                onClick={(e) => {
                  goDetail(e)
                }}
              >
                <FormattedMessage id='home_text_23' />
              </a>
            </div>
            <div className='enter_pool_card'>
              <h1 className='coming_soon_title'>
                <FormattedMessage id='home_text_24' />
              </h1>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio coming_soon_ratio'>
                  <FormattedMessage id='home_text_19' />
                </p>
              </div>
              <div className='enter_pool_percentage'>
                <a>
                  <i
                    className='enter_pool_progress_bar'
                    style={{
                      width: '0%',
                    }}
                  ></i>
                </a>
                <p>
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </p>
              </div>
              <a
                className={cs(
                  'enter_pool_enter',
                  'coming_soon_btn',
                  'enter_pool_disable_enter'
                )}
                onClick={(e) => {
                  goDetail(e)
                }}
              >
                <FormattedMessage id='home_text_23' />
              </a>
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
              <p>Logo</p>
              <p>Logo</p>
              <p>Logo</p>
            </div>
            <div className='backed_by_content_box'>
              {/* <img src='' />
            <img src='' />
            <img src='' /> */}
              <p>Logo</p>
              <p>Logo</p>
              <p>Logo</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Home)
