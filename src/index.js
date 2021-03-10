import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './views/layout'
import 'antd/dist/antd.css'
import 'normalize.css'
import './assets/css/index.less'

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
)
