import React, { Component, PropTypes } from 'react'
import Friend from './Friend'
import { fetchFriendListIfNeeded, fetchUserInfo, switchFriend} from '../../../actions'
import AddFriendContainer from '../../../containers/friendList/AddFriendContainer'
import ProfileContainer from '../../../containers/user/ProfileContainer'
import $ from 'jquery'

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

        //case of adding friend, user info is available, but friend list needed to be refresh
        //refresh friend list only after page loaded, that means user info and old friend list available
        if(nextProps.refresh && nextProps.userInfoAvailability && nextProps.availability) {
            const { dispatch, userId } = nextProps
            dispatch(fetchFriendListIfNeeded(userId))
        }
    }

    onFriendClick(slot, fId) {
        const { dispatch } = this.props
        dispatch(switchFriend(slot, fId)) //switch to another friend to chat, use the slot number to identify target friend. And message reducer will clear current chat record
                                            // slot number used for locating switching friend on friend list, fId used for clearing alert of unread msg on non-active friend avatar

    }


    render() {
        const {isFetching, fList, userInfoAvailability } =  this.props
        var divStyle = {
            overflow: 'hidden',
            outline: 'none',
            height: 'calc(100vh - 194px)'
        }
        var lists = fList
        return (
             <div className="col-sm-3 col-xs-12 animated fadeInLeft">
                <ProfileContainer />
                <AddFriendContainer  />
                <div className="col-inside-lg decor-default chat" style={divStyle} tabindex="5000">
                    <div className="chat-users">
                        {
                            isFetching ? <h2>Loading...</h2> : lists.map((info, i) =>
                                                                <Friend info={info}
                                                                onClick={()=>this.onFriendClick(i, info.id)}/>)
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default FriendList


