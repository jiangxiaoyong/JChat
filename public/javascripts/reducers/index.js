import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
//import formReducer from './auth/formReducer'

export default combineReducers({
    form: formReducer
})