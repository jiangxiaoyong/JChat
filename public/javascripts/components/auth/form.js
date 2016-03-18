import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

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
        const {fields: {email, password}, handleSubmit, authStatus} = this.props;

        return (
            <form onSubmit={handleSubmit} >
                <div>
                    {authStatus == 'INVALID' &&
                    <div className="alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span className="sr-only">Error:</span>
                        Wrong user name or password
                    </div>}
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" placeholder="xxx@xxx.com" {...email}/>
                    </div>
                    {email.touched && email.error &&
                    <div className="alert alert-danger">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span className="sr-only">Error:</span>
                        {email.error}
                    </div>}
                </div>
                <div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" {...password}/>
                    </div>
                    {password.touched && password.error &&
                    <div className="alert alert-info">
                        <strong>Warning!</strong>{password.error}
                    </div>}
                </div>

                <button type="submit" className="btn btn-warning btn-lg">Login</button>
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