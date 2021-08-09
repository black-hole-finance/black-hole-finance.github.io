import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useActiveWeb3React } from '../../../hooks'
import { BLACK_ADDRESS } from '../../../constants'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'
import {CopySvg, SuccessSvg} from "../../../assets/js/svgData";
import HalBornLogo from '../../../assets/image/halborn-logo@2x.png'
import BlackHoleAuditReport from '../../pdfFile/BlackHoleAuditReport.pdf'
import './index.less'

const Banner = (props) => {
  const { chainId } = useActiveWeb3React()
  const BlackTokenAddress =
    BLACK_ADDRESS[chainId] || '0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2'
  const jumpPosition = (e) => {
    //e.target.innerText与id相同
    //获取到元素的offsetTop顶部距离
    let offsetTop = document.getElementById(e.target.innerText).offsetTop
    //滚动页面的section标签内的部分
    window.scrollTo({ top: offsetTop })
  }
  useEffect(() => {
    window.document.getElementById('container').style.display = ''
  }, [props.location.pathname])

  const goDetail = (val) => {
    props.history.push(val)
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
            <CopyToClipboard
              text={BlackTokenAddress}
              onCopy={() => {
                message.success({
                  content: 'copy success',
                  icon: (
                    <span className='copy_message_icon'>
                      <SuccessSvg />
                    </span>
                  ),
                })
              }}
            >
              <span className='banner_text_top banner_text_bottom'>
                <FormattedMessage
                  id='banner_text_8'
                  values={{ coin: 'BLACK' }}
                />
                {' ' + BlackTokenAddress}
                <CopySvg />
              </span>
            </CopyToClipboard>
          </div>
          <div className='banner_btn'>
            <a href='https://docsend.com/view/5sagkb87dt96mccm'>
              <FormattedMessage id='banner_text_4' />
            </a>
            {<a
              onClick={(e) => {
                goDetail('/burn')
              }}
              target='_blank'
            >
              <FormattedMessage id='banner_text_9' />
            </a> }
            <a
              href='https://www.gateio.pro/cn/trade/BLACK_USDT'
              target='_blank'
            >
              <FormattedMessage id='banner_text_11' />
            </a>
            {/* <a
              onClick={(e) => {
                jumpPosition(e)
              }}
            >
              <FormattedMessage id='banner_text_5' />
            </a> */}
            {/*<a href={BlackHoleAuditReport} className='audit_report' target='_blank'>*/}
            {/*  <img src={HalBornLogo} />*/}
            {/*  <FormattedMessage id='banner_text_10' />*/}
            {/*</a>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
}))(withRouter(Banner))
