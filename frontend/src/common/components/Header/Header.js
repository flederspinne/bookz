import React, {Fragment, useState} from 'react'

import Box from '../Box/Box'
import Link from '../Link/Link'
import Logo from '../Logo/Logo'
import Panel from '../Panel/Panel'
import Input from '../Input/Input'
import Button from '../Button/Button'

import api from '../../helpers/api'

import s from './Header.module.scss'


const Header = (props) => {

    const { user } = props

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const submit = async () => {
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
                                    <Link>Войти</Link>
                                </Box>
                                <Box mt="xsm" mr="sm">
                                    <Link>Зарегистрироваться</Link>
                                </Box>
                            </div>
                        )
                    }
                    {
                        user
                        && (
                            <Fragment>{user.username}</Fragment>
                        )
                    }
                </Box>
            </div>
            {
                !user
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
                                <Button onClick={submit}>Вход</Button>
                            </Box>
                        </Panel>
                    </Box>
                )
            }
        </Fragment>
    )
}

export default Header