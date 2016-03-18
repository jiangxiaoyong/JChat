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
        const  { authStatus } = this.props
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}
                  authStatus={authStatus}/>
        )
    }

}


let mapStateToProps = (state) => {
    return {
        authStatus: state.authReducer
    }
}

export default connect(
    mapStateToProps
)(submitForm);