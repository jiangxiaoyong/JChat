/**
 *
 * Created by jxymacbook on 2016-04-07.
 */
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import AddFriend from '../../components/chat/friendList/AddFriend'
import {addFriend} from '../../actions'
import {reset} from 'redux-form';

class add extends Component {

    handleSubmit(data) {
        this.props.dispatch(addFriend(data))
        this.props.dispatch(reset('addFriend')) //clear input field of add friend
    }

    render() {
        return (
            <AddFriend onSubmit={this.handleSubmit.bind(this)}
                  />
        )
    }
}

const AddFriendContainer = connect(

)(add)

export default AddFriendContainer
