import React from 'react'

const Avatar = ({ imgSrc, userStatus }) => (

        <div className="avatar" >
            <img src={imgSrc}/>
            <div className={userStatus}></div>
        </div>

)

export default Avatar
