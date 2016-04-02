import React, { Component, PropTypes } from 'react'
import InputBoxContainer from '../../../containers/chat/InputBoxContainer'
import MessageContainer from '../../../containers/chat/MessageContainer'
import io from 'socket.io-client';

const socket = io()

class MainBody extends Component {

    componentDidMount() {
        const { dispatch, socket } = this.props

    }

    handleSendMsg(data) {
        socket.emit('hello', {'a':'a'})
    }

    render() {
         var divStyle = {
            overflow: 'hidden',
            outline: 'none'
         }

         return(
             <div className='col-sm-9 col-xs-12 animated bounceInRight'>
                  <div className="col-inside-lg decor-default chat" style={divStyle} tabindex="5001">
                     <div className="chat-body">
                         <h6>JChat</h6>
                         <MessageContainer />
                     </div>
                  </div>
                  <div className='bottom_wrapper'>
                      <InputBoxContainer handleSendMsg = {this.handleSendMsg} />
                  </div>
             </div>
         )
    }



}

export default MainBody
