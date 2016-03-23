import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import {
    SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'
import authReducer from './auth/authReducer'
import FriendListReducer from './friendList/friendListReducer'

function selectedReddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit
        default:
            return state
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsByReddit(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.reddit]: posts(state[action.reddit], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit,
    authReducer,
    FriendListReducer,
    form: formReducer
})

export default rootReducer