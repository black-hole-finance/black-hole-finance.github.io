import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './header'
import Banner from './banner'

import Home from '../pages/home'
import Detail from '../pages/detail'
import Intl from '../../locale/intl'

function App() {
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
          </Switch>
        </div>
      </Router>
    </Intl>
  )
}

export default App
