import { REQUEST_MESSAGE, RECEIVE_MESSAGE, RECEIVE_CHATRECORD } from '../../actions'

let messageReducer = (state = {
    mType: 'answer left',
    chatRecord: []
}, action) => {
    switch (action.type) {
        case REQUEST_MESSAGE:
            return Object.assign({}, state, {
            })
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {
            })
        case RECEIVE_CHATRECORD:
            return Object.assign({}, state, {
                chatRecord: action.chatRecord
            })       
        default:
            return state
    }
}

export default messageReducer 

