import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Message from '../../components/chat/chatBody/Message'

const mapStateToProps = (state) => {

    const { messageReducer } = state
    const {
        messageType,
        payload
        } = messageReducer || {
        messageType: 'answer left',
        payload: []
    }

    return {
        messageType,
        payload
    }
}


const MessageContainer = connect(
    mapStateToProps
)(Message)

export default MessageContainer