import React from 'react'

import Box from '../Box/Box'
import Link from '../Link/Link'
import Logo from '../Logo/Logo'

import s from './Header.module.scss'


const Header = () => {
    return (
        <div className={s.header}>
            <Box mt="xxs" ml="md" className={s.wrapper}>
                <Logo />

                <div className={s.logInWrapper}>
                    <Box mt="xsm" mr="sm">
                        <Link>Войти</Link>
                    </Box>
                    <Box mt="xsm" mr="sm">
                        <Link>Зарегистрироваться</Link>
                    </Box>
                </div>
            </Box>
        </div>
    )
}

export default Header