import React, { Fragment } from 'react'

import Input from '../../../common/components/Input/Input'
import Button from '../../../common/components/Button/Button'


const LoginPage = () => {
    return (
        <Fragment>
            <Input label="Логин" />
            <Input label="Пароль" />
            <Button>Вход</Button>
        </Fragment>
    )
}

export default LoginPage