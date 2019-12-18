import React from 'react'

import s from './Button.module.scss'


const Button = (props) => {
    const {
        onClick,
        children
    } = props

    return <button className={s.button} onClick={onClick}>{children}</button>
}

export default Button