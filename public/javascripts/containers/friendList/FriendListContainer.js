import { connect } from 'react-redux'
import FriendList from '../../components/chat/friendList/FriendList'
import React, { Component, PropTypes } from 'react'

function mapStateToProps(state) {

    const { friendListReducer, userInfoReducer} = state
    const {
        isFetching,
        fList
        } = friendListReducer || {
        isFetching: true,
        fList: []
    }

    let userInfoAvailability =  userInfoReducer.availability //used as flag to determine when to fetch friend list
    let availability = friendListReducer.availability
    let refresh = friendListReducer.refresh
    let userId = userInfoReducer.id

    return {
        isFetching,
        userInfoAvailability,
        availability,
        refresh,
        userId,
        fList
    }
}


const FriendListContainer = connect(
    mapStateToProps
)(FriendList)

export default FriendListContainer
