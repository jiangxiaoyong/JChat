import { connect } from 'react-redux'
import FriendList from '../../components/chat/friendList/FriendList'
import React, { Component, PropTypes } from 'react'

function mapStateToProps(state) {

    const { friendListReducer} = state
    const {
        isFetching,
        fList
        } = friendListReducer || {
        isFetching: true,
        fList: []
    }

    return {
        isFetching,
        fList
    }
}


const FriendListContainer = connect(
    mapStateToProps
)(FriendList)

export default FriendListContainer
