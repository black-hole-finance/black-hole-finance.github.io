import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { withRouter } from 'react-router'
import { useWeb3React } from '@web3-react/core'
import { connectWallet } from '../../../utils'
import { injected } from '../../../connectors'

const Burn = (props) => {
  const { dispatch } = props
  const { activate, deactivate } = useWeb3React()

  useEffect(() => {
    window.document.getElementById('container').style.display = 'none'
  }, [])

  return (
    <>
      <div className='burn_box'>111122222</div>
    </>
  )
}

export default withRouter(Burn)
