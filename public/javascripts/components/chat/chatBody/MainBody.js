import React, { Component, PropTypes } from 'react'
import InputBoxContainer from '../../../containers/chat/InputBoxContainer'
import MessageContainer from '../../../containers/chat/MessageContainer'
import ActiveFriendContainer from '../../../containers/chat/ActiveFriendContainer'
import io from 'socket.io-client';
import {reset} from 'redux-form';
import {sendMessage,
        receiveMessage,
        switchFriendDone,
        refreshFriendList,
        setActiveFriend,
        showUnreadMsgAlert,
        updateLatestMsgAtFriendList} from '../../../actions'


let socket
let activeFriend
let currentUser
let cachedChatHistoryAllFriends = {}
let fList

class MainBody extends Component {

    handleIncomingMsg() {
        const {dispatch} = this.props
        socket.on('receiveMsg@' + currentUser.id, function(msg){ //only accept message that send to me specified by current user ID
            if(activeFriend && msg.to == currentUser.id && msg.from == activeFriend.id ) { //only accept and show message that chatting between current user and active friend
                dispatch(receiveMessage(msg, activeFriend))
                $("html, body, div").animate({ scrollTop: 9999 },1000); //scroll down to show new message
            } else {
                dispatch(showUnreadMsgAlert(msg.from))//show alert of unread msg for non active user
            }
            dispatch(updateLatestMsgAtFriendList(msg.from, msg.text)) //show latest receiving msg beside friend avatar
            cachedChatHistoryAllFriends[msg.from].push(msg)//store chat history for all friends
        })

        socket.on('chatHistoryAllFriends', function(data) {
            /*
                construct an object mapping from friend id to their individual chat record
                {
                    id1 : [ {msg1} , {msg2}, ...],
                    id2 : [ {msg1} , {msg2}, ...]
                }
             */
            var msgObjs = data.map(JSON.parse)
            fList.map(function(f) { //loop friend list
                cachedChatHistoryAllFriends[f.id] = msgObjs.filter(function(msg) { //construct array of msg objects by array.filter
                    if(msg.from === f.id || msg.to === f.id) return true //filtering msg belong to looping friend
                    else return false
                })
            })

            /*
                loop all chat history to show latest msg beside friend avatar
             */
            for(var fId in cachedChatHistoryAllFriends) {
                var msgs = cachedChatHistoryAllFriends[fId]
                if(msgs.length > 0) {
                    var latestMsg = msgs[msgs.length - 1]
                    dispatch(updateLatestMsgAtFriendList(fId, latestMsg.text))
                } else {
                    dispatch(updateLatestMsgAtFriendList(fId, "Start chatting now"))//when there is no chat history, just showing basic info
                }

            }
        })

        //listening on refresh event, server will fire this event when it finish storing new friend into corresponding friend list of user, and inform both of them
        socket.on('refreshFriendList@' + currentUser.id, function() {
            dispatch(refreshFriendList())
        })
    }

    switchChatRecord() {
         const {dispatch} = this.props
         cachedChatHistoryAllFriends[activeFriend.id].map(function(msg) {
            if(msg.from == currentUser.id) { //message that send from current user
                dispatch(sendMessage(msg, currentUser))
            }
            else if(msg.from == activeFriend.id) { //message that send from active friend
                dispatch(receiveMessage(msg, activeFriend))
            }
        })
        $("html, body, div").animate({ scrollTop: 9999 },1000);//scroll down to bottom of latest chat after each loading of chat history, or switching between friend
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
                fList = nextProps.friendListReducer.fList
                socket.emit('loadAllChatHistory', currentUser.id);//load chat history between all friends and me
            }
        }

        /*
            initially, chat record page is empty and will be filled with content after user clicking or switching between friend
         */
        if(nextProps.friendListReducer.isSwitching ) { //case of switching chatting friend
            activeFriend = nextProps.friendListReducer.fList[nextProps.friendListReducer.switchTo]
            this.switchChatRecord()
            this.props.dispatch(setActiveFriend(activeFriend)) //set the active friend info showing on top of chatting page
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
        this.dispatch(updateLatestMsgAtFriendList(msg.to, msg.text)) //show latest sending msg beside friend avatar of active friend
        cachedChatHistoryAllFriends[msg.to].push(msg)//store chat history for all friends
        $("html, body, div").animate({ scrollTop: 9999 },1000)//scroll down to show new message
    }

    render() {
         var divStyle = {
            overflow: 'hidden',
            outline: 'none'
         }
        /*
            show input box when there is a friend has been selected
         */
         return(
             <div className='col-sm-9 col-xs-12 animated fadeInRight'>
                  <ActiveFriendContainer />
                  <div className="col-inside-lg decor-default chat" style={divStyle} tabindex="5001">
                     <div className="chat-body">
                         <MessageContainer />
                     </div>
                  </div>
                  { activeFriend ? <div className='bottom_wrapper animated bounceIn'>
                                          <InputBoxContainer handleSendMsg = {this.handleSendMsg} />
                                   </div>
                                 : ''
                  }
             </div>
         )
    }



}

export default MainBody
