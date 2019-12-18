import React from 'react'

import './Button.scss'


const Button = (props) => {
    const {
        onClick,
        children
    } = props

    return <button className="button" onClick={onClick}>{children}</button>
}

export default Button