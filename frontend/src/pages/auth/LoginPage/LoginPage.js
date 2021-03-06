import React, { Fragment, useState } from 'react'

import Input from '../../../common/components/Input/Input'
import Button from '../../../common/components/Button/Button'

import api from '../../../common/helpers/api'


const LoginPage = () => {

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

    const test = async () => {
        let response = await fetch('http://localhost:4000/api/auth/dashboard', {
            withCredentials: true,
            credentials: 'include',
        })

        let result = await response.json()
        console.log(result)
    }

    const logout = async () => {
        let response = await fetch(api.authLogout, {
            mode: 'cors',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })

        let result = await response.json()
        console.log(result)
    }

    return (
        <Fragment>
            <Input label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={submit}>Вход</Button>
            <Button onClick={test}>test</Button>
            <Button onClick={logout}>logout</Button>
        </Fragment>
    )
}

export default LoginPage