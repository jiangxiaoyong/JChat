import { SEND_MESSAGE, RECEIVE_MESSAGE, RECEIVE_CHATRECORD } from '../../actions'

let convertMsg = (state, action) => {
    switch(action.type) {
        case SEND_MESSAGE:
            return {
                type: 'answer right',
                userName: action.currentUser.userName,
                userStatus: 'online',
                imgSrc: action.currentUser.imgSrc,
                text: action.msg.text,
                time: action.msg.time
            }
        case RECEIVE_MESSAGE:
            return {
                type: 'answer left',
                userName: action.activeFriend.userName,
                userStatus: 'online',
                imgSrc: action.activeFriend.imgSrc,
                text: action.msg.text,
                time: action.msg.time
            }
        default:
            return state
    }
}

let messageReducer = (state = [], action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return [
                ...state,
                convertMsg(undefined, action)
            ]
        case RECEIVE_MESSAGE:
            return [
                ...state,
                convertMsg(undefined, action)
            ]
        case RECEIVE_CHATRECORD:
            return Object.assign({}, state, {
                chatRecord: action.chatRecord
            })       
        default:
            return state
    }
}

export default messageReducer 

