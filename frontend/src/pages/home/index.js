import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import links from '../../common/helpers/links'

import HomePage from './HomePage/HomePage'


const Auth = (props) => {
    const { match: { url } } = props

    return (
        <Switch>
            <Route exact path={url} component={HomePage} />
            <Redirect to={url} />
        </Switch>
    )
}

export default Auth