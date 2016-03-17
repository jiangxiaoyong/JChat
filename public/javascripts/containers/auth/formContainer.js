import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import Form from '../../components/auth/Form';
import { authUserInfo } from '../../actions'

class submitForm extends Component {

    handleSubmit(data) {
        console.log('Submission received!', data);
        this.props.dispatch(authUserInfo(data));
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}/>
        )
    }

}

export default connect()(submitForm);