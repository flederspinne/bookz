import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import links from '../../common/helpers/links'

import HomePage from './HomePage/HomePage'


const Home = (props) => {
    const { match: { url }, user } = props

    return (
        <Switch>
            <Route exact path={url} render={(props) => <HomePage user={user} {...props} />} />
            <Redirect to={url} />
        </Switch>
    )
}

export default Home