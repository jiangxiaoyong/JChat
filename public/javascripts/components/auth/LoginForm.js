/**
 * Created by jxymacbook on 2016-03-11.
 */
import React from 'react'
import Form from '../../containers/auth/LFormContainer'
import Footer from './Footer'

let LoginForm = () => (
    <div>
        <Form buttonText="Log in"
                url="/login"/>
        <hr className="sep-line"/>
        <Footer text="Need an account? "
                url="/signup"
                linkText="Signup"/>
    </div>

)

export default LoginForm