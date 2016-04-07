import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import MainBody from '../../components/chat/chatBody/MainBody'

let mapStateToProps = (state) => {

    return {
        friendListReducer: state.friendListReducer,
        currentUser: state.userInfoReducer,
    }
}

const MainBodyContainer = connect(
    mapStateToProps
)(MainBody)

export default MainBodyContainer
