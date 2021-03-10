import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import { withRouter } from 'react-router'
import './index.less'
import SketchMap from '../../../assets/image/sketch_map@2x.png'
import SmallLogoText from '../../../assets/image/small_logo_text@2x.png'

const Home = (props) => {
  const [hoverFlag, setHoverFlag] = useState(false)
  const goDetail = (e) => {
    props.history.push(`/detail/0x4F7d4aCF1A2d92C5b64a7365e3cD214aCF1A2d92C5b`)
    console.log(e)
  }

  return (
    <>
      <div className='home'>
        <div className='content'>
          <h2 className='home_title'>
            Governance token BLACK token black hole deflation burning mechanism
            schematic
          </h2>
          <div className='home_content'>
            <p className='home_content_text'>
              The creator holds X tokens and Black's liquidity to create a black
              hole burn pool without a license, in which they can invest new
              tokens Y to incentivize the burn. 80% of the actual burn volume is
              also used by Black to incentivize the burn.
            </p>
            <a className='home_sketch_map'></a>
          </div>
        </div>
      </div>
      <div className='roadmap'>
        <div className='content'>
          <h2 className='roadmap_title'>Roadmap</h2>
          <p className='roadmap_timeline'>
            <span></span>
            <span></span>
            <span></span>
          </p>
          <div className='roadmap_card'>
            <div className='roadmap_card_content'>
              <h3>2021Q2</h3>
              <p className='roadmap_card_text'>
                Perform IDO to generate initial circulation
              </p>
              <p className='roadmap_card_text'>
                Go live with liquidity farming pool
              </p>
              <p className='roadmap_card_text'>
                Go live with single token burning protocol
              </p>
              <p className='roadmap_card_text'>
                Go live with liquidity token burning protocol
              </p>
            </div>
            <div className='roadmap_card_content'>
              <h3>2021Q3</h3>
              <p className='roadmap_card_text'>
                Goes live with cross-chain aggregated burning protocols (
                Ethereum, Polka, BSC, Heco, etc.)
              </p>
              <p className='roadmap_card_text'>
                Launch of the initial burning offering platform (IBO)
              </p>
              <p className='roadmap_card_text'>
                Go live Token governance platform
              </p>
            </div>
            <div className='roadmap_card_content'>
              <h3>2021Q4</h3>
              <p className='roadmap_card_text'>
                Start V2 Black Hole Protocol version - Big Disruption.
              </p>
            </div>
          </div>
          <a className='roadmap_png'></a>
        </div>
      </div>
      <div className='i_do'>
        <div className='content'>
          <h2 className='i_do_title'>IDO</h2>
          <div className='enter_pool'>
            <div className='enter_pool_card'>
              <div className='enter_pool_title'>
                <p className='enter_pool_title_left'>
                  <img src={SmallLogoText} />
                </p>
                <p className='enter_pool_title_right'>Seed Round</p>
              </div>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio'>
                  Ratio
                  <i>0.1U=1BLACK</i>
                </p>
                <p className='enter_pool_ratio' style={{ textAlign: 'right' }}>
                  Total funds will be raised
                  <i>XXXXXU</i>
                </p>
              </div>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio enter_pool_progress'>Progress</p>
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
                  Access Type
                </p>
                <p
                  className='enter_pool_ratio enter_pool_access'
                  style={{ textAlign: 'right' }}
                >
                  <span className={cs('crown', 'crown-highlight')}></span>
                  Private
                  <span
                    className='tips'
                    onMouseOver={() => setHoverFlag(1)}
                    onMouseOut={() => setHoverFlag(null)}
                  >
                    {hoverFlag === 1 && (
                      <i className='tips_content'>
                        这是一个私有池，只有获得白名单才能兑换
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
                Enter Pool
              </a>
            </div>
            <div className='enter_pool_card'>
              <h1 className='coming_soon_title'>ComingSoon</h1>
              <div className='enter_pool_title'>
                <p className='enter_pool_ratio coming_soon_ratio'>Progress</p>
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
                Enter Pool
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='backed_by'>
        <div className='content'>
          <h2 className='backed_by_title'>Backed By</h2>
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
