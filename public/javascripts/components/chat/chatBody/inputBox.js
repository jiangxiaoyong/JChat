import React from 'react'

const InputBox = ({ }) => (

       <form>
           <div>
               <input className="message_input" placeholder="Type your message here..."/>
           </div>
           <div>
               <div className="icon"></div>
               <div className="text">Send</div>
           </div>
       </form>
)

export default InputBox