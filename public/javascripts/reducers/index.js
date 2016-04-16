import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth/authReducer'
import friendListReducer from './friendList/friendListReducer'
import messageReducer from './chat/messageReducer'
import userInfoReducer from './user/userInfoReducer'

const rootReducer = combineReducers({
    authReducer,
    friendListReducer,
    userInfoReducer,
    messageReducer,
    form: formReducer
})

export default rootReducer