import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import LoginForm from './components/auth/LoginForm'
import configureStore from './store/configureStore'

let store = configureStore()

render(
    <Provider store={store}>
        <LoginForm />
    </Provider>,
    document.getElementById('loginForm')
)
