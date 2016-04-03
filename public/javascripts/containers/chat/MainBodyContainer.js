import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import MainBody from '../../components/chat/chatBody/MainBody'

let mapStateToProps = (state) => {
    return {
        activeFriend: state.friendListReducer.activeFriend,
        currentUser: state.userInfoReducer
    }
}

const MainBodyContainer = connect(
    mapStateToProps
)(MainBody)

export default MainBodyContainer
