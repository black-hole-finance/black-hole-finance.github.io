import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import './index.less'

const Banner = (props) => {
  const jumpPosition = (e) => {
    //e.target.innerText与id相同
    //获取到元素的offsetTop顶部距离
    let offsetTop = document.getElementById(e.target.innerText).offsetTop
    //滚动页面的section标签内的部分
    window.scrollTo({ top: offsetTop })
  }

  const goDetail = (e) => {
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
            <a href='https://docsend.com/view/9bn3sk2nyftxc5rj' target='_blank'>
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
                // goDetail(e)
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
