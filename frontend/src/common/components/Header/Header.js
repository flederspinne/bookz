import React from 'react'

import Box from '../Box/Box'
import Logo from '../Logo/Logo'

import s from './Header.module.scss'


const Header = () => {
    return (
        <div className={s.header}>
            <Box mt="xxs" ml="md">
                <Logo />
            </Box>
        </div>
    )
}

export default Header