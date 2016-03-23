import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import chatApp from './components/chatApp'
import configureStore from './store/configureStore'

let store = configureStore()

render(
    <Provider store={store}>
        <chatApp />
    </Provider>,
    document.getElementById('root')
)
