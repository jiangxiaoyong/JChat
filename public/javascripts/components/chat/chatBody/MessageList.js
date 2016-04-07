import React, { Component, PropTypes } from 'react'
import Message from './Message'
import { fetchChatRecord } from '../../../actions'
import $ from 'jquery'

class MessageList extends Component {

    componentWillReceiveProps(nextProps) {
        //fetch chat record only when user info available
        if (nextProps.isSwitchingFriend ) {
            const { dispatch } = nextProps

        }
    }
    componentDidMount() {
//        $("html, body, div").animate({ scrollTop: 9999 },1000); //scroll down to bottom of latest chat at initial load
    }


    shouldComponentUpdate (nextProps) { //only update when new message need to display on screen
        return nextProps.chatRecord.length !== this.props.chatRecord.length
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

