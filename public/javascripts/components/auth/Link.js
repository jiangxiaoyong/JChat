import React, { PropTypes } from 'react'

const Link = ({text, url, linkText}) => {

    return (

        <div>
            <p>{text} <a href={url} >{linkText}</a></p>
        </div>

    )
}


export default Link