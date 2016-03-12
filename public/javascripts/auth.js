import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/auth'
import LoginForm from './components/auth/LoginForm'

let store = createStore(reducer)

render(
    <Provider store={store}>
        <LoginForm />
    </Provider>,
    document.getElementById('loginForm')
)
