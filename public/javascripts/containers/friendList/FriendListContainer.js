import { connect } from 'react-redux'
import FriendList from '../../components/chat/friendList/FriendList'
import React, { Component, PropTypes } from 'react'

function mapStateToProps(state) {

    const { FriendListReducer} = state
    const {
        isFetching,
        fList
        } = FriendListReducer || {
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
