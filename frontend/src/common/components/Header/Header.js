import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { useToggle } from '../../hooks'

import Box from '../Box/Box'
import Link from '../Link/Link'
import Logo from '../Logo/Logo'
import Panel from '../Panel/Panel'
import Input from '../Input/Input'
import Button from '../Button/Button'
import DropdownMenu from '../DropdownMenu/DropdownMenu'

import api from '../../helpers/api'
import links from '../../helpers/links'

import s from './Header.module.scss'


const Header = (props) => {

    const {
        user,
        setUser,
        history
    } = props

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { toggle: toggleLogin, close: closeLogin, isActive: isLoginOpened } = useToggle(false)
    const { toggle: toggleMenu, close: closeMenu, isActive: isMenuOpened } = useToggle(false)

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

    const items = [
        {
            text: 'Настройки профиля',
            onClick: () => { history.push(links.settingsProfile) }
        },
        {
            text: 'Выход',
            onClick: logout
        },
    ]


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
                                    <Link onClick={toggleLogin}>Войти</Link>
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
                            <Box mr="xxl" className={s.userAndDropdownMenu}>
                                <Box
                                    onClick={toggleMenu}
                                    className={s.avatarBox}
                                    style={{ backgroundImage: `url(${user.avatarUrl})` }}
                                />
                                {
                                    isMenuOpened
                                        && <DropdownMenu username={user.username} items={items} />
                                }
                                {/*{user.username}*/}
                                {/*<Link onClick={logout}>Выйти</Link>*/}
                            </Box>
                        )
                    }
                </Box>
            </div>
            {
                !user && isLoginOpened
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
                                <a href={api.authVK}>VK</a>
                                <a href={api.authGoogle}>Google</a>
                            </Box>
                        </Panel>
                    </Box>
                )
            }
        </Fragment>
    )
}

export default withRouter(Header)