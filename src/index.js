import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './views/layout'
import 'antd/dist/antd.css'
import 'normalize.css'
import './assets/css/index.less'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store/index'
import { getLibrary } from './utils/getLibrary'
import { Web3ReactProvider } from '@web3-react/core'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout />
      </Web3ReactProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
