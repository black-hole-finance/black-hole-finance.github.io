import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from '../../utils/getLibrary'
import Header from './header'
import Banner from './banner'

import Home from '../pages/home'
import Detail from '../pages/detail'
import ConnectWallet from '../pages/connectWallet'
import Intl from '../../locale/intl'

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
          </div>
        </Router>
      </Intl>
    </Web3ReactProvider>
  )
}

export default App
