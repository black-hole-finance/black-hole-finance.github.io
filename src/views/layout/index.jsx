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
import Mining from '../pages/mining'
import Intl from '../../locale/intl'
import './index.less'

import {
  usePoolsInfo,
  useActiveWeb3React,
  useEagerConnect,
  useInactiveListener,
} from '../../hooks'
import Activate from '../pages/activate'
import {connect} from "react-redux";

function App(props) {
  const { activate, account } = useWeb3React()
  const tried = useEagerConnect()
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
            <Route exact path='/activate'>
              <Activate />
            </Route>
            <Route exact path='/burn'>
              <Burn />
            </Route>
            <Route exact path='/mining'>
              <Mining />
            </Route>
          </Switch>
          <InitPage />
        </div>
      </Router>
    </Intl>
  )
}
export default App
