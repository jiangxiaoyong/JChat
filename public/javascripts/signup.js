import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import SignupForm from './components/auth/SignupForm'
import configureStore from './store/configureStore'

let store = configureStore()

render(
    <Provider store={store}>
        <SignupForm />
    </Provider>,
    document.getElementById('signupForm')
)
