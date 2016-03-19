import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { Alert, Input, Button } from 'react-bootstrap';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if(!values.password){

    }else if (values.password.length > 0 && values.password.length <=3 ) {
        errors.password = ' Password too short';
    }

    return errors;
};

class Form extends Component {

    render() {
        const {fields: {email, password}, handleSubmit, authStatus, buttonText} = this.props;

        return (
            <form onSubmit={handleSubmit} >
                {authStatus == 'INVALID' &&
                    <Alert bsStyle="danger" className="animated jello">
                        <strong>Error: </strong>Wrong User Name or Password
                    </Alert>
                }
                <Input type="email" label="Email Address" name='email' placeholder="Enter email" {...email}/>
                {email.touched && email.error &&
                <Alert bsStyle="danger" className="animated jello">
                    <strong>Error: </strong> {email.error}
                </Alert>
                }

                {authStatus == 'INVALID' ?
                <Input type="password" label="Password" name="password" bsStyle="error" {...password} hasFeedback/>
                :<Input type="password" label="Password" name="password" className='animated fadeInUp' {...password} />
                }


                {password.touched && password.error &&
                <Alert bsStyle="warning" className="animated jello">
                    <strong>Warning: </strong> {password.error}
                </Alert>
                }
                <Button type='submit' bsStyle="primary" bsSize="large">{buttonText}</Button>
            </form>
        )
    }

}

Form = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'login',                           // a unique name for this form
    fields: ['email', 'password'], // all the fields in your form
    validate,
})(Form);

export default Form