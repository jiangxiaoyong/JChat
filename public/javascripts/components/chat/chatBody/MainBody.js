import React, { Component, PropTypes } from 'react'
import InputBoxContainer from '../../../containers/chat/InputBoxContainer'
import MessageContainer from '../../../containers/chat/MessageContainer'
import {sendMessage, receiveMessage, resetInputBox } from '../../../actions'
import io from 'socket.io-client';
import {reset} from 'redux-form';



let socket;
let activeFriend;
let currentUser;

class MainBody extends Component {

    handleIncomingMsg() {
        const {dispatch} = this.props
        socket.on('receiveMsg@' + currentUser.id, function(msg){ //only accept message that send to me specified by current user ID
            dispatch(receiveMessage(msg, activeFriend))
        })
    }

    componentDidMount() {
        socket = io() //connect to nodeJS server
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser.availability != this.props.currentUser.availability ) { //current user info is available
            currentUser = nextProps.currentUser // store current user info
            this.handleIncomingMsg() //establish socket listener only when user info is available
            socket.emit('iam', currentUser.id); //report who i am for debugging
        }

        if(nextProps.friendListReducer.availability != this.props.friendListReducer.availability) {
             activeFriend = nextProps.friendListReducer.fList[0]// store current active chatting friend
        }

    }
    handleSendMsg(data) {
        var msg = {
                        from: currentUser.id,
                        to  : activeFriend.id,
                        text: data.message,
                        time:    new Date().toLocaleTimeString('en-US', { hour12: false,
                                                                          hour: "numeric",
                                                                          minute: "numeric"})
                  }
        socket.emit('sendMsg', msg) // send message to back-end nodeJS server over socket io
        this.dispatch(reset('message')) //clear message input box
        this.dispatch(sendMessage(msg, currentUser)) //display sending message on chat record box

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
