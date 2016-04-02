import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import InputBox from '../../components/chat/chatBody/InputBox'

class sendMessage extends Component {

    handleSubmit(data) {
        this.props.handleSendMsg(data);
    }

    render() {
        return (
            <InputBox onSubmit={this.handleSubmit.bind(this)}
                  />
        )
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSendMsg: ownProps.handleSendMsg
    }
}

const InputBoxContainer = connect(
    mapDispatchToProps
)(sendMessage)

export default InputBoxContainer