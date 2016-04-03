import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form';

class InputBox extends Component {


    render(){
        const {fields: {message}, handleSubmit } = this.props;
        return(
              <form onSubmit={handleSubmit}>
                <div className='message_input_wrapper'>
                    <input type="text" name='email' className="message_input" placeholder="Type your message here..." {...message}/>
                </div>

                <button type='submit' className="send_message">
                    <div className="text">Send</div>
                </button>
            </form>
         )

    }

}
InputBox = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'message',
    fields: ['message' ] // all the fields in your form
})(InputBox);

export default InputBox