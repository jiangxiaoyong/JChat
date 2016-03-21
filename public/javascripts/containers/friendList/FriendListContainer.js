import { connect } from 'react-redux'
import FriendList from '../../components/chat/friendList/FriendList'

const mapStateToProps = (state, ownProps) => {

    const { friendListReducer} = state
    const {
        isFetching,
        fList
        } = friendListReducer || {
        isFetching: true,
        items: []
    }

    return {
        isFetching,
        fList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
        }
    }
}

const FriendContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendList)

export default FriendContainer
