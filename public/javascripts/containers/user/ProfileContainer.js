/**
 *
 * Created by jxymacbook on 2016-04-10.
 */
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Profile from '../../components/chat/user/Profile'

const mapStateToProps = (state) => {

    const { userInfoReducer } = state
    let info = userInfoReducer || []

    return {
        info,
    }
}


const ProfileContainer = connect(
    mapStateToProps
)(Profile)

export default ProfileContainer

