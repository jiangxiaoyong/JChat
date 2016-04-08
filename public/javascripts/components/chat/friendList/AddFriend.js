/**
 *
 * Created by jxymacbook on 2016-04-07.
 */
import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';

class AddFriend extends Component {


    render(){
        const {fields: {email}, handleSubmit } = this.props;
        return(
            <div className="add_friend_wrapper">
                 <form onSubmit={handleSubmit}>
                    <div className="add_friend_input_wrapper">
                        <input type="text" name='email' className="add_friend_input" placeholder="Add your friend by Email" {...email}/>
                    </div>
                </form>
            </div>
         )

    }

}
AddFriend = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'addFriend',
    fields: ['email' ] // all the fields in your form
})(AddFriend);

export default AddFriend
