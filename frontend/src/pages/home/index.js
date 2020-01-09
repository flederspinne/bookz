import React from 'react'
import { Route, Switch } from 'react-router-dom'

import links from '../../common/helpers/links'

import HomePage from './HomePage/HomePage'


const Auth = (props) => {
    const { match: { url } } = props

    return (
        <Switch>
            <Route exact path={url} component={HomePage} />
        </Switch>
    )
}

export default Auth