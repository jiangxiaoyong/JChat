import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const LOGGED_FAILED = 'LOGGED_FAILED'
export const LOGGED_SUCCESSFULLY = 'LOGGED_SUCCESSFULLY'
export const REQUEST_FRIENDLIST = 'REQUEST_FRIENDLIST'
export const RECEIVE_FRIENDLIST = 'RECEIVE_FRIENDLIST'


export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    }
}

export function invalidateReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    }
}

function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}

function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit: reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit))
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))
    }
}

function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        }
    }
}

/*
 ***************************** End of Example******************************
 */

/*
 ********************************** User Authentication ************************************
 */
export function loginFailed(response) {
    return {
        type: LOGGED_FAILED,
        response
    }
}

export function loginSuccess(response) {
    return {
        type: LOGGED_SUCCESSFULLY,
        response
    }
}

export function authUserInfo(usrInfo, url) {
    return dispatch => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(usrInfo),
            credentials: 'include' //Should you want to make a fetch request with credentials such as cookies, you should set the credentials of the request to “include”.
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch(loginSuccess(response));
                    return response.json();
                } else {
                    dispatch(loginFailed(response));
                }
        })
            .then( json => {
                window.location = json.destPage //redirect page location
            })
            .catch( error => {
            console.log('POST user login authentication info failed: ' + error.message);
        });

    }
}

/*
 ************************************** Friend List ************************************************
 */

export function requestFriendList() {
    return {
        type: REQUEST_FRIENDLIST
    }
}

export function receiveFriendList(json) {
    return {
        type: RECEIVE_FRIENDLIST,
        fList: json.data.children.map(child => child.data),
    }
}

export function fetchFriendList() {
    return dispatch => {
        dispatch(requestFriendList())
        return fetch('/friendList')
               .then(response => response.json())
               .then(json => dispatch(receiveFriendList(json)))
    }
}

export function fetchFriendListIfNeeded(reddit) {
    return (dispatch, getState) => {
        if (shouldFetchFriendList(getState())) {
            return dispatch(fetchFriendList())
        }
    }
}

function shouldFetchFriendList(state) {

    const obj = state.friendListReducer
    if (obj.isFetching){
        return true
    }
    else{
        return false
    }

}
