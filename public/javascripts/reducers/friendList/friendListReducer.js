import { REQUEST_FRIENDLIST, RECEIVE_FRIENDLIST} from '../../actions'

let friendListReducer = (state = {
    isFetching: true,
    fList: [],
    activeFriend: {
        id : "56fd8b99226076750236d57a",
        chID : "56fd8b59226076750236d579&56fd8b99226076750236d57a",
        userName : "mike",
        userStatus : "online",
        imgSrc : "/images/avatar.ico"
    }
}, action) => {
    switch (action.type) {
        case REQUEST_FRIENDLIST:
            return Object.assign({}, state, {
               isFetching: true
            })
        case RECEIVE_FRIENDLIST:
            return Object.assign({}, state, {
                isFetching: false,
                fList: action.fList
            })
        default:
            return state
    }
}

export default friendListReducer
