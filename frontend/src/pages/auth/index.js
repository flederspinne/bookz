import React from 'react'
import { Route, Switch } from 'react-router-dom'

import links from '../../common/helpers/links'

import LoginPage from './LoginPage/LoginPage'


const Auth = () => {
    return (
        <Switch>
            <Route exact path={links.authLogin} component={LoginPage} />
        </Switch>
    )
}

export default Auth