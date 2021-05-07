import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../hooks'
import { Web3ReactActivate } from '../../../connectors'
import { BLACK_ADDRESS } from '../../../constants'

import './index.less'

const Banner = (props) => {
  const { chainId } = useActiveWeb3React()
  const jumpPosition = (e) => {
    //e.target.innerText与id相同
    //获取到元素的offsetTop顶部距离
    let offsetTop = document.getElementById(e.target.innerText).offsetTop
    //滚动页面的section标签内的部分
    window.scrollTo({ top: offsetTop })
  }

  const goDetail = (e) => {
    props.history.push(`/investment`)
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
            <a
              className='banner_text_top banner_text_bottom'
              href={'https://etherscan.io/address/' + BLACK_ADDRESS[chainId]}
              target='_blank'
            >
              {BLACK_ADDRESS[chainId]}
              <svg
                t='1619095072712'
                className='icon'
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='1281'
                width='20'
                height='20'
              >
                <path
                  d='M424.96 128v87.04H215.04v599.04h599.04v-215.04h87.04v256c0 25.6-20.48 40.96-40.96 40.96H168.96c-25.6 0-40.96-20.48-40.96-40.96V168.96c0-25.6 20.48-40.96 40.96-40.96h256z m327.68 87.04h-194.56V128h343.04v343.04h-87.04V271.36L512 573.44 450.56 512l302.08-296.96z'
                  p-id='1282'
                ></path>
              </svg>
            </a>
          </div>
          <div className='banner_btn'>
            <a href='https://docsend.com/view/5sagkb87dt96mccm' target='_blank'>
              <FormattedMessage id='banner_text_4' />
            </a>
            {/* <a
              onClick={(e) => {
                jumpPosition(e)
              }}
            >
              <FormattedMessage id='banner_text_5' />
            </a> */}
            {/* <a
              onClick={(e) => {
                goDetail(e)
              }}
            >
              <FormattedMessage id='banner_text_6' />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(Banner))
