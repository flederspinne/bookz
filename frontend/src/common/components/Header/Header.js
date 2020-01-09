import React from 'react'

import Logo from '../Logo/Logo'

import s from './Header.module.scss'


const Header = () => {
    return (
        <div className={s.header}>
            <Logo />
        </div>
    )
}

export default Header