import { REQUEST_FRIENDLIST, RECEIVE_FRIENDLIST, SWITCH_FRIEND, SWITCH_FRIEND_DONE} from '../../actions'

let friendListReducer = (state = {
    isFetching: true,
    availability: false,
    isSwitching: false,
    switchTo : '',
    fList: [],
    activeFriend: {}
}, action) => {
    switch (action.type) {
        case REQUEST_FRIENDLIST:
            return Object.assign({}, state, {
               isFetching: true
            })
        case RECEIVE_FRIENDLIST:
            return Object.assign({}, state, {
                isFetching: false,
                fList: action.fList,
                availability: true
            })
        case SWITCH_FRIEND:
            return Object.assign({}, state, {
                isSwitching: true,
                switchTo: action.id
            })
        case SWITCH_FRIEND_DONE:
            return Object.assign({}, state, {
                isSwitching: false,
                switchTo: ''
            })
        default:
            return state
    }
}

export default friendListReducer
