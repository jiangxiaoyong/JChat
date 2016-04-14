import React from 'react'

const Avatar = ({ imgSrc, userStatus, unReadMsg }) => (

        <div className="avatar" >
            <img src={imgSrc}/>
            <div className={userStatus}></div>
            {
                unReadMsg ? <div className="status offline"></div> : <div></div>
            }
        </div>

)

export default Avatar
