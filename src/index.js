import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './store'
// import startStream from './stream'
import routes from './routes'

import './styles/main.styl'

const store = window.store = createStore()

// startStream(store)

ReactDom.render(
  <Provider store={store}>
    {routes}
  </Provider>
  , document.getElementById('root')
)
