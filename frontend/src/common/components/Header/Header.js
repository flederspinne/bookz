import React, { Fragment, useState, useEffect } from 'react'
import { useToggle } from '../../hooks'

import Box from '../Box/Box'
import Link from '../Link/Link'
import Logo from '../Logo/Logo'
import Panel from '../Panel/Panel'
import Input from '../Input/Input'
import Button from '../Button/Button'

import api from '../../helpers/api'
import links from '../../helpers/links'

import s from './Header.module.scss'


const Header = (props) => {

    const {
        user,
        setUser
    } = props

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { toggle: togglePanel, close: closePanel, isActive: isPanelOpened } = useToggle(false)

    const login = async () => {
        let response = await fetch(api.authLogin, {
            method: 'POST',
            mode: 'cors',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        let result = await response.json()
        console.log(result)
        setUser(result)
    }

    const loginVK = async () => {
        let response = await fetch(api.authVK, {
            mode: 'no-cors',
            withCredentials: true,
            credentials: 'include',
        })

        // let result = await response.json()
        let result = await response.text()
        console.log(result)
        // setUser(result)
    }

    const loginGoogle = async () => {
        let response = await fetch(api.authGoogle, {
            mode: 'no-cors',
            withCredentials: true,
            credentials: 'include',
        })

        // let result = await response.json()
        let result = await response.text()
        console.log(result)
        // setUser(result)
    }

    const logout = () => {
        fetch(api.authLogout, {
            mode: 'cors',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(() => setUser(null))
    }


    return (
        <Fragment>
            <div className={s.header}>
                <Box mt="xxs" ml="md" className={s.wrapper}>
                    <Logo />

                    {
                        !user
                        && (
                            <div className={s.logInWrapper}>
                                <Box mt="xsm" mr="sm">
                                    <Link onClick={togglePanel}>Войти</Link>
                                </Box>
                                <Box mt="xsm" mr="sm">
                                    <Link href={links.authRegister}>Зарегистрироваться</Link>
                                </Box>
                            </div>
                        )
                    }
                    {
                        user
                        && (
                            <Fragment>
                                {user.username}
                                <Link onClick={logout}>Выйти</Link>
                            </Fragment>
                        )
                    }
                </Box>
            </div>
            {
                !user && isPanelOpened
                && (
                    <Box mt="lg" mr="xlg" className={s.panelWrapper}>
                        <Panel
                            title="Вход в систему"
                            className={s.panel}
                        >
                            <Input label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Box mt="xs">
                                <Input label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Box>
                            <Box mt="xs" className={s.panelButton}>
                                <Button onClick={login}>Вход</Button>
                                {/*<Button onClick={loginVK}>ВК</Button>*/}
                                {/*<Button onClick={loginGoogle}>Google</Button>*/}
                                <a href="http://localhost:4000/api/auth/vkontakte">VK</a>
                                <a href="http://localhost:4000/api/auth/google">Google</a>
                            </Box>
                        </Panel>
                    </Box>
                )
            }
        </Fragment>
    )
}

export default Header