import { REQUEST_FRIENDLIST, RECEIVE_FRIENDLIST} from '../../actions'

let friendListReducer = (state = {
    isFetching: true,
    fList: []
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
