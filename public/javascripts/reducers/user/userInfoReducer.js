import { RECEIVE_USERINFO } from '../../actions'

let userInfoReducer = (state = {
    id:'',
    userName: 'unnamed',
    imgSrc: '/images/Mario.ico',
    email: '',
    availability: false
}, action) => {
    switch (action.type) {
        case RECEIVE_USERINFO:
            return Object.assign({}, state, {
                id: action.userInfo._id,
                userName: action.userInfo.info.userName,
                imgSrc: action.userInfo.info.imgSrc,
                email: action.userInfo.info.email,
                availability: true
            })

        default:
            return state
    }
}

export default userInfoReducer
