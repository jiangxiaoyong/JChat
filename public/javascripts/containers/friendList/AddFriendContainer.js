/**
 *
 * Created by jxymacbook on 2016-04-07.
 */
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import AddFriend from '../../components/chat/friendList/AddFriend'
import {addFriend} from '../../actions'

class add extends Component {

    handleSubmit(data) {
        this.props.dispatch(addFriend(data))
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
