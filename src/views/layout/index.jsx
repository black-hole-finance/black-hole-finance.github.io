import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../../utils/getLibrary'
import Header from './header'
import Banner from './banner'

import Home from '../pages/home'
import Investment from '../pages/investment'
import InitPage from '../pages/initPage'
import LBP from '../pages/lbp'
import Burn from '../pages/burn'
import Intl from '../../locale/intl'

import {
  usePoolsInfo,
  useActiveWeb3React,
  useEagerConnect,
  useInactiveListener,
} from '../../hooks'
import Activate from '../pages/activate'

function App() {
  const { activate, account } = useWeb3React()
  const tried = useEagerConnect()
  // const pools = usePoolsInfo(store.getState().pools.connectPools.address)

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
            <Route exact path='/investment'>
              <Investment />
            </Route>
            <Route exact path='/LBP'>
              <LBP />
            </Route>
            <Route>
              <Activate exact path='/activate' />
            </Route>
            <Route exact path='/burn'>
              <Burn />
            </Route>
          </Switch>
          <InitPage />
        </div>
      </Router>
    </Intl>
  )
}

export default App
