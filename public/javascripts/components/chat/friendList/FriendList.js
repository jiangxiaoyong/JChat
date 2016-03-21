import React, { Component, PropTypes } from 'react'
import Friend from './Friend'

const FriendList = ({isFetching, fList}) => (

    <div className="col-sm-3 col-xs-12 animated bounceInLeft">
        <div className="col-inside-lg decor-default chat" style="overflow: hidden; outline: none;" tabindex="5000">
            <div className="chat-users">
                <h6>Friends</h6>
                    {
                        isFetching? <h2>Loading...</h2> : <h2>Empty</h2>
                    }
                    {fList}.map((info, i) =>
                        <Friend info={info} />)
            </div>
        </div>
    </div>

)

export default FriendList


