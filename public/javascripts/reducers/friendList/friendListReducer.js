import { REQUEST_FRIENDLIST,
        RECEIVE_FRIENDLIST,
        SWITCH_FRIEND,
        SWITCH_FRIEND_DONE,
        REFRESH_FRIEND_LIST,
        SET_ATVIE_FRIEND,
        SHOW_UNREAD_MSG_ALERT,
        SHOW_LATEST_MSG} from '../../actions'

let friendListReducer = (state = {
    isFetching: true,
    availability: false,
    isSwitching: false,
    refresh: false,
    switchTo : '',
    fList: [],
    activeFriend: {'imgSrc': 'images/questionMark.png'},
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
                switchTo: action.slot,
                fList: state.fList.map(f =>
                                       f.id === action.fId?
                                       Object.assign({}, f, { unReadMsg: false}) : f ) // clear alert of unread msg appearing right beside avatar
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
        case SHOW_UNREAD_MSG_ALERT:
             return Object.assign({}, state, {
                 fList: state.fList.map(f =>
                                        f.id === action.msgFrom ?
                                        Object.assign({}, f, { unReadMsg: true}) : f ) //show alert of unread msg right beside avatar
             })
        case SHOW_LATEST_MSG:
              return Object.assign({}, state, {
                  fList: state.fList.map(f =>
                                         f.id === action.targetFriend?
                                         Object.assign({}, f, {msgContent: action.text}) : f) //show latest msg beside friend avatar
              })

        default:
            return state
    }
}

export default friendListReducer
