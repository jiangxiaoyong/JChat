import React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import Form from '../../components/auth/Form';

class submitForm extends React.Component {

    handleSubmit(data) {
        console.log('Submission received!', data);
        //this.props.dispatch(initialize('login', {})); // clear form
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}/>
        )
    }

}

export default connect()(submitForm);