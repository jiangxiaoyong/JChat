import React from 'react'

const InputBox = ({ }) => (

       <form>
           <div className='message_input_wrapper'>
               <input className="message_input" placeholder="Type your message here..."/>
           </div>
           <div className="send_message">
               <div className="icon"></div>
               <div className="text">Send</div>
           </div>
       </form>
)

export default InputBox