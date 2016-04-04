import React, { Component, PropTypes } from 'react'
import Message from './Message'
import { fetchChatRecord } from '../../../actions'
import $ from 'jquery'

class MessageList extends Component {

    componentWillReceiveProps(nextProps) {
        //fetch chat record only when user info available
        if (nextProps.userInfoAvailability !== this.props.userInfoAvailability) {
            const { dispatch, userId } = nextProps
            //dispatch(fetchChatRecord(userId))
        }
    }
    componentDidMount() {

    }

    componentDidUpdate() {
        $("html, body, div").animate({ scrollTop: 9999 },1000);
    }
    
    render() {
        const { chatRecord } =  this.props

        var chatList = chatRecord
        return(
            <div>
                {chatList.map((item, i) =>
                    <Message messageType= { item.type ? item.type : mType }
                                 payload= { item } />)}
            </div>
        )

    }
}

export default MessageList

