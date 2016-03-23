import React, { Component, PropTypes } from 'react'
import Friend from './Friend'
import { fetchFriendListIfNeeded } from '../../../actions'

class FriendList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchFriendListIfNeeded())
    }

    render() {
        const {isFetching, fList} =  this.props
        var divStyle = {
            overflow: 'hidden',
            outline: 'none'
        }
        return (
             <div className="col-sm-3 col-xs-12 animated bounceInLeft">
                <div className="col-inside-lg decor-default chat" style={divStyle} tabindex="5000">
                    <div className="chat-users">
                        <h6>Friends</h6>
                        {
                            isFetching ? <h2>Loading...</h2> : {fList}.map((info, i) =>
                                                                <Friend info={info}/>)
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default FriendList


