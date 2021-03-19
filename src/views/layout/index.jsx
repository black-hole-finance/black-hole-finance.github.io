import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../../utils/getLibrary'
import Header from './header'
import Banner from './banner'

import Home from '../pages/home'
import Detail from '../pages/detail'
import ConnectWallet from '../pages/connectWallet'
import InitPage from '../pages/initPage'
import Intl from '../../locale/intl'
import {
  useActiveWeb3React,
  useEagerConnect,
  useInactiveListener,
} from '../../hooks'
import { injected } from '../../connectors'
import { useEffect, useMemo } from 'react'
import { useBalance } from '../../hooks/wallet'

function App() {
  const { activate, account } = useWeb3React()
  const tried = useEagerConnect()
  // 调用合约，获取用户余额
  const balance = useBalance(account)
  useInactiveListener(!tried)

  useMemo(() => {
    console.log('当前账户余额', balance)
  }, [balance])

  useEffect(() => {
    console.log(tried)
  }, [tried])

  return (
    <Intl>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Banner />
              <Home />
            </Route>
            <Route exact path='/detail/:address'>
              <Detail />
            </Route>
            <Route exact path='/connectWallet'>
              <ConnectWallet />
            </Route>
          </Switch>
          <InitPage />
        </div>
      </Router>
    </Intl>
  )
}

export default App
