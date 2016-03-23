import React from 'react'
import Avatar from '../friendList/Avatar'

const Message = ({ messageType, payload}) => (

    <div className={messageType}>
        <Avatar imgSrc={payload.imgSrc} userStatus={payload.userStatus}/>
        <div className='name'>{payload.userName}</div>
        <div className="text">{payload.text}</div>
        <div className="time">{payload.time}</div>
    </div>

)

export default Message
