import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './views/layout'
import 'antd/dist/antd.css'
import 'normalize.css'
import './assets/css/index.less'
import { Provider } from 'react-redux'
import { store } from './store/index'
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
