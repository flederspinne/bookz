import React from 'react'
import { Route, Switch } from 'react-router-dom'

import links from '../../common/helpers/links'

import LoginPage from './LoginPage/LoginPage'
import RegisterPage from './RegisterPage/RegisterPage'


const Auth = () => {
    return (
        <Switch>
            <Route exact path={links.authLogin} component={LoginPage} />
            <Route exact path={links.authRegister} component={RegisterPage} />
        </Switch>
    )
}

export default Auth