import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import MessageList from '../../components/chat/chatBody/MessageList'

const mapStateToProps = (state) => {

    const { messageReducer } = state
    const {
        mType,
        chatRecord
        } = messageReducer || {
        mType: 'answer left',
        chatRecord: []
    }

    return {
        mType,
        chatRecord
    }
}


const MessageContainer = connect(
    mapStateToProps
)(MessageList)

export default MessageContainer