import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { useActiveWeb3React } from '../../../hooks'
import { Web3ReactActivate } from '../../../connectors'

import './index.less'

const Banner = (props) => {
  Web3ReactActivate()
  const { active, chainId } = useActiveWeb3React()
  console.log(active, chainId, 112233)
  const jumpPosition = (e) => {
    //e.target.innerText与id相同
    //获取到元素的offsetTop顶部距离
    let offsetTop = document.getElementById(e.target.innerText).offsetTop
    //滚动页面的section标签内的部分
    window.scrollTo({ top: offsetTop })
  }

  const goDetail = (e) => {
    if (!active) {
      props.history.push('/connectWallet')
      return
    }
    props.history.push(`/detail/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
  }

  return (
    <div className='banner'>
      <div className='content'>
        <div className='banner_content'>
          <div>
            <h2 className='banner_title'>
              <FormattedMessage id='banner_text_1' />
            </h2>
            <p className='banner_text_top'>
              <FormattedMessage id='banner_text_2' />
            </p>
            <p className='banner_text'>
              <FormattedMessage id='banner_text_3' />
            </p>
            <p className='banner_text'>
              <FormattedMessage id='banner_text_7' />
            </p>
          </div>
          <div className='banner_btn'>
            <a href='https://docsend.com/view/gwm65k85my5rf68f' target='_blank'>
              <FormattedMessage id='banner_text_4' />
            </a>
            {/* <a
              onClick={(e) => {
                jumpPosition(e)
              }}
            >
              <FormattedMessage id='banner_text_5' />
            </a> */}
            <a
              onClick={(e) => {
                goDetail(e)
              }}
            >
              <FormattedMessage id='banner_text_6' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Banner)
