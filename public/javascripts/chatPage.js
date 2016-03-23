import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import FriendListContainer from './components/chatApp'
import configureStore from './store/configureStore'

let store = configureStore()

render(
    <Provider store={store}>
        <FriendListContainer/>
    </Provider>,
    document.getElementById('root')
)
