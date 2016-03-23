import React from 'react'
import InputBox from './InputBox'
import MessageContainer from '../../../containers/chat/MessageContainer'

const MainBody = ({ }) => {

    var divStyle = {
        overflow: 'hidden',
        outline: 'none'
    }

    return(
         <div className='col-sm-9 col-xs-12 animated bounceInRight'>
              <div className="col-inside-lg decor-default chat" style={divStyle} tabindex="5001">
                 <div className="chat-body">
                     <h6>JChat</h6>
                     <MessageContainer />
                 </div>
              </div>
              <div className='bottom_wrapper'>
                  <InputBox />
              </div>
         </div>
     )


}

export default MainBody
