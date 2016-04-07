import React, { Component, PropTypes } from 'react'
import InputBoxContainer from '../../../containers/chat/InputBoxContainer'
import MessageContainer from '../../../containers/chat/MessageContainer'
import {sendMessage, receiveMessage, resetInputBox, switchFriendDone } from '../../../actions'
import io from 'socket.io-client';
import {reset} from 'redux-form';

let socket;
let activeFriend;
let currentUser;

class MainBody extends Component {

    handleIncomingMsg() {
        const {dispatch} = this.props
        socket.on('receiveMsg@' + currentUser.id, function(msg){ //only accept message that send to me specified by current user ID
            if((msg.from == currentUser.id || msg.to == currentUser.id) && (msg.from == activeFriend.id || msg.to == activeFriend.id)) { //only accept and show message that chatting between current user and active friend
                dispatch(receiveMessage(msg, activeFriend))
            }
            $("html, body, div").animate({ scrollTop: 9999 },1000); //scroll down to show new message
        })

        socket.on('chatHistory', function(data){
            data.map(function(obj) {
                var msg = JSON.parse(obj)
                if((msg.from == currentUser.id || msg.to == currentUser.id) && (msg.from == activeFriend.id || msg.to == activeFriend.id)) { //filter chat history belong to current user and active friend
                    if(msg.from == currentUser.id) { //message that send from current user
                        dispatch(sendMessage(msg, currentUser))
                    }
                    else if(msg.from == activeFriend.id) { //message that send from active friend
                        dispatch(receiveMessage(msg, activeFriend))
                    }
                }
            })
            $("html, body, div").animate({ scrollTop: 9999 },1000);//scroll down to bottom of latest chat after each loading of chat history, or switching between friend
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

        if(nextProps.friendListReducer.availability != this.props.friendListReducer.availability) { //friend list is available
            if(nextProps.friendListReducer.fList) {
              activeFriend = nextProps.friendListReducer.fList[0]// store current active chatting frienda, loading the first friend in the list by default
              socket.emit('loadChatHistory', currentUser.id);//load chat history between all friends and me
            }
        }

        if(nextProps.friendListReducer.isSwitching ) { //case of switching chatting friend
            activeFriend = nextProps.friendListReducer.fList[nextProps.friendListReducer.switchTo]
            socket.emit('loadChatHistory', currentUser.id);
            this.props.dispatch(switchFriendDone()) // set is switching flag to false to avoid entering this condition
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
        $("html, body, div").animate({ scrollTop: 9999 },1000)//scroll down to show new message
    }

    render() {
         var divStyle = {
            overflow: 'hidden',
            outline: 'none'
         }

         return(
             <div className='col-sm-9 col-xs-12 animated fadeInRight'>
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
