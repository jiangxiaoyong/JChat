import React, { Component, PropTypes } from 'react'
import Friend from './Friend'
import { fetchFriendListIfNeeded, fetchUserInfo, switchFriend} from '../../../actions'

class FriendList extends Component {

    componentWillMount() {
        const { dispatch } = this.props
        dispatch(fetchUserInfo())
    }

    componentWillReceiveProps(nextProps) {
        //fetch friend list only when user info available
        if (nextProps.userInfoAvailability !== this.props.userInfoAvailability) {
            const { dispatch, userId } = nextProps
            dispatch(fetchFriendListIfNeeded(userId))
        }
    }

    onFriendClick(slot) {
        const { dispatch } = this.props
        dispatch(switchFriend(slot)) //switch to another friend to chat, use the slot number to identify target friend. And message reducer will clear current chat record
    }

    render() {
        const {isFetching, fList, userInfoAvailability } =  this.props
        var divStyle = {
            overflow: 'hidden',
            outline: 'none'
        }
        var lists = fList
        return (
             <div className="col-sm-3 col-xs-12 animated fadeInLeft">
                <div className="col-inside-lg decor-default chat" style={divStyle} tabindex="5000">
                    <div className="chat-users">
                        <h6>Friends</h6>
                        {
                            isFetching ? <h2>Loading...</h2> : lists.map((info, i) =>
                                                                <Friend info={info}
                                                                onClick={()=>this.onFriendClick(i)}/>)
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default FriendList


