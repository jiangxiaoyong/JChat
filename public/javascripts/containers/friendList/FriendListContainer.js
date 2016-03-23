import { connect } from 'react-redux'
import FriendList from '../../components/chat/friendList/FriendList'
import React, { Component, PropTypes } from 'react'

class test extends Component {
    render(){
        const {isFetching, fList} = this.props
        return(
            <h1>shdfdhsfhds:{isFetching}</h1>
        )
    }
}

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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
        }
    }
}

const FriendListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(test)

export default FriendListContainer
