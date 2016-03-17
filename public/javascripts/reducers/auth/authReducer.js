import { LOGGED_FAILED } from '../../actions'

let authReducer = (state = 'VALID', action) => {
    switch (action.type) {
        case LOGGED_FAILED :
            return 'INVALID'
        default:
            return state
    }
}

export default authReducer