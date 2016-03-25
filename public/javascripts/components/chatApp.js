import React from 'react'
import FriendListContainer from  '../containers/friendList/FriendListContainer'
import MainBody from './chat/chatBody/MainBody'

let chatApp = () => (
    <div className="row row-broken">
        <FriendListContainer />
        <MainBody />
    </div>

)

export default chatApp
