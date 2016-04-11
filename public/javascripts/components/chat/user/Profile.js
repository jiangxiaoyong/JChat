/**
 *
 * Created by jxymacbook on 2016-04-10.
 */
import React from 'react'

const Profile = ({ info }) => (

    <div className="ms-user clearfix">
        <img src={info.imgSrc} className="img-avatar pull-left"/>
        <div>{info.userName}<br/>{info.email}</div>
    </div>

)

export default Profile
