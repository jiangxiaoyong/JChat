import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

class Form extends Component {

    render() {
        const {fields: {email, password}, handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit} >
                <div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" placeholder="xxx@xxx.com" {...email}/>
                    </div>
                    {email.touched && email.error && <div>{email.error}</div>}
                </div>
                <div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" {...password}/>
                    </div>
                    {password.touched && password.error && <div>{password.error}</div>}
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