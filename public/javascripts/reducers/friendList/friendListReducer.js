import { REQUEST_FRIENDLIST, RECEIVE_FRIENDLIST, SWITCH_FRIEND, SWITCH_FRIEND_DONE, REFRESH_FRIEND_LIST, SET_ATVIE_FRIEND} from '../../actions'

let friendListReducer = (state = {
    isFetching: true,
    availability: false,
    isSwitching: false,
    refresh: false,
    switchTo : '',
    fList: [],
    activeFriend: {'imgSrc': 'images/questionMark.png'}
}, action) => {
    switch (action.type) {
        case REQUEST_FRIENDLIST:
            return Object.assign({}, state, {
               isFetching: true,
               availability: false
            })
        case RECEIVE_FRIENDLIST:
            return Object.assign({}, state, {
                isFetching: false,
                fList: action.fList,
                availability: true,
                refresh: false
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
        case REFRESH_FRIEND_LIST:
            return Object.assign({}, state, {
                 refresh: true
            })
        case SET_ATVIE_FRIEND:
             return Object.assign({}, state, {
                 activeFriend: action.activeFriend
            })
        default:
            return state
    }
}

export default friendListReducer
