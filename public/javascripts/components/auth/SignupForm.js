import React from 'react'
import Form from '../../containers/auth/FormContainer'
import Footer from './Footer'

let SignupForm = () => (
    <div>
        <Form buttonText="Sign up"
                url='/signup'/>
        <hr/>
        <Footer text="Already have an account? "
                url="/"
                linkText="Signup"/>
    </div>

)

export default SignupForm
