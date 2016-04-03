import React, { Component, PropTypes } from 'react'
import InputBoxContainer from '../../../containers/chat/InputBoxContainer'
import MessageContainer from '../../../containers/chat/MessageContainer'
import {sendMessage, receiveMessage} from '../../../actions'
import io from 'socket.io-client';

let socket;
let activeFriend;
let currentUser;

class MainBody extends Component {

    handleIncomingMsg() {
        //const {dispatch} = this.props
        socket.on('receiveMsg@' + currentUser.id, function(data){ //only accept message that send to me specified by currentl user ID
            console.log('receive data: '+ data)
        })
    }

    componentDidMount() {
        socket = io() //connect to nodeJS server
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser.availability != this.props.currentUser.availability ) { //current user info is available
            currentUser = nextProps.currentUser // store current user info
            this.handleIncomingMsg() //establish socket listener only when user info is available
            socket.emit('iam', currentUser.id);
        }

        activeFriend = nextProps.activeFriend // store current active chatting friend
    }
    handleSendMsg(data) {
        //const { dispatch } = this.props
        var msg = {
                        from: currentUser.id,
                        to  : activeFriend.id,
                        text: data.message,
                        time: new Date().toLocaleString()
                  }
        socket.emit('sendMsg', msg)
        this.dispatch(sendMessage(msg, currentUser))


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
