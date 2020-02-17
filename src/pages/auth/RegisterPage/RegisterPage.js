import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Input from '../../../common/components/Input/Input'
import Box from '../../../common/components/Box/Box'
import Button from '../../../common/components/Button/Button'

import api from '../../../common/helpers/api'
import links from '../../../common/helpers/links'

import s from './RegisterPage.module.scss'


const RegisterPage = (props) => {

    const {
        history,
        setUser
    } = props

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const submit = async () => {
        let response = await fetch(api.usersRegister, {
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
        history.push(links.home)
    }

    return(
        <Fragment>
            <Box mt="xxxl" className={s.registerWrapper}>
                <Input label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Box mt="xs">
                    <Input label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box mt="xs">
                    <Button onClick={submit}>Зарегистрироваться</Button>
                </Box>
            </Box>
        </Fragment>
    )
}

export default withRouter(RegisterPage)