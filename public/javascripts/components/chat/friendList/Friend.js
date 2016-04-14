import React from 'react'
import Avatar from './Avatar'

const Friend = ({ info, onClick }) => (

    <div className="user animated fadeInUp" id={info.id} onClick={onClick} >
        <Avatar imgSrc={info.imgSrc} userStatus={info.userStatus} unReadMsg={info.unReadMsg}/>
        <div className='name'>{info.userName}</div>
        <div className="mood">{info.userMood}</div>
    </div>

)

export default Friend
