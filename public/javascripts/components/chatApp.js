import React from 'react'
import FriendListContainer from  '../containers/friendList/FriendListContainer'
import MainBodyContainer from '../containers/chat/MainBodyContainer'

let App = () => (
    <div className="row row-broken">
        <FriendListContainer />
        <MainBodyContainer />
    </div>

)

export default App
