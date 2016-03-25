import React, { Component, PropTypes } from 'react'
import Message from './Message'
import { fetchChatRecord } from '../../../actions'

class MessageList extends Component {
    
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchChatRecord())
    }
    
    render() {
        const { chatRecord, mType } =  this.props

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

