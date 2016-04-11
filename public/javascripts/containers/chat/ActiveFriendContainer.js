/**
 *
 * Created by jxymacbook on 2016-04-10.
 */
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import ActiveFriend from '../../components/chat/chatBody/ActiveFriend'

const mapStateToProps = (state) => {

    const { friendListReducer } = state
    let info = friendListReducer.activeFriend || []

    return {
        info,
    }
}


const ActiveFriendContainer = connect(
    mapStateToProps
)(ActiveFriend)

export default ActiveFriendContainer
