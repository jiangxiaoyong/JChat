import React, { Component, PropTypes } from 'react'
import InputBoxContainer from '../../../containers/chat/InputBoxContainer'
import MessageContainer from '../../../containers/chat/MessageContainer'
import io from 'socket.io-client';

const socket = io()
let activeFriend;
let currentUser;

class MainBody extends Component {

    handleIncomingMsg() {
        socket.on('receiveMsg' + currentUser.id, function(data){
            console.log('receive data: '+ data)
        })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser.availability != this.props.currentUser.availability ) { //current user info is available
            currentUser = nextProps.currentUser // store current user info
            this.handleIncomingMsg()
            socket.emit('iam', currentUser.id);
        }

        activeFriend = nextProps.activeFriend // store current active chatting friend
    }
    handleSendMsg(data) {
        var chID =  activeFriend.chID
        socket.emit('sendMsg', {
                                from: currentUser.id,
                                to  : activeFriend.id,
                                chID: chID,
                                text: data.message
                            })


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
