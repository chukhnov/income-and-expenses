import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { history, store } from './store'
import App from './App'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'))
