import React from 'react'
import Form from '../../containers/auth/FormContainer'
import Footer from './Footer'

let SignupForm = () => (
    <div>
        <Form buttonText="Sign up"
                url='/signup'/>
        <hr className="sep-line"/>
        <Footer text="Already have an account? "
                url="/login"
                linkText="Login"/>
    </div>

)

export default SignupForm
