import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import MessageList from '../../components/chat/chatBody/MessageList'

const mapStateToProps = (state) => {

    const { messageReducer,  userInfoReducer } = state
    let chatRecord= messageReducer || []
    let userInfoAvailability =  userInfoReducer.availability //used as flag to determine when to fetch friend list
    let userId = userInfoReducer.id

    return {
        chatRecord,
        userInfoAvailability,
        userId,
    }
}


const MessageContainer = connect(
    mapStateToProps
)(MessageList)

export default MessageContainer