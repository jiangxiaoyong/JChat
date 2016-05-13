/**
 *
 * Created by jxymacbook on 2016-04-10.
 */
import React from 'react'

const ActiveFriend = ({info}) => (

    <div className="action-header clearfix">
        <div className="visible-xs" id="ms-menu-trigger">
        <i className="fa fa-bars"></i>
        </div>

        <div className="pull-left hidden-xs">
            <img src={info.imgSrc} className="img-avatar m-r-10" />
            <div className="lv-avatar pull-left"></div>
            <span>{info.userName}</span>
        </div>

    </div>

)

export default ActiveFriend
