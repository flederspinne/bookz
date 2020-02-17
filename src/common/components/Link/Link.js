import React from 'react'

import s from './Link.module.scss'


const Link = (props) => {

    const {
       href,
       children,
       onClick
    } = props

    return (
        <a href={href} onClick={onClick} className={s.link}>{children}</a>
    )
}

export default Link