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

    }else if (values.password.length > 0 && values.password.length <=1 ) {
        errors.password = ' Password too short';
    }

    return errors;
};

class Form extends Component {

    render() {
        const {fields: {email, password}, handleSubmit, authStatus, buttonText} = this.props;

        return (
            <form onSubmit={handleSubmit} >
                <div className="form-content">
                    {authStatus == 'INVALID' && //prompt when failed to validate user name and password
                        <Alert bsStyle="danger" className="animated jello">
                            <strong>Error: </strong>Wrong User Name or Password
                        </Alert>
                    }

                    <div className="form-group">
                        <input type="text" name='email' className="form-control input-underline input-lg" placeholder="Email" {...email}/>
                    </div>
                    {email.touched && email.error && //prompt when wrong email address
                    <Alert bsStyle="danger" className="animated jello">
                        <strong>Error: </strong> {email.error}
                    </Alert>
                    }


                    <div className="form-group">
                        <input type="password" name='password' className="form-control input-underline input-lg" placeholder="Password" {...password} />
                    </div>
                    {password.touched && password.error && //prompt when password too short
                    <Alert bsStyle="warning" className="animated jello">
                        <strong>Warning: </strong> {password.error}
                    </Alert>
                    }
                    <button type='submit' className="btn btn-info btn-lg btn-block">{buttonText}</button>
                </div>
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