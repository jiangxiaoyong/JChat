/**
 * Created by jxymacbook on 2016-03-11.
 */
import { connect } from 'react-redux'
import Form from '../../components/auth/Form'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submit: () =>  {

        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)