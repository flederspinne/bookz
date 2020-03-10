import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import links from '../../common/helpers/links'

import HomePage from './HomePage/HomePage'
import SettingsPage from './SettingsPage/SettingsPage'


const Home = (props) => {
    const { match: { url }, user } = props

    return (
        <Switch>
            <Route exact path={url} render={(props) => <HomePage user={user} {...props} />} />
            <Route exact path={links.settingsProfile} render={(props) => <SettingsPage user={user} {...props} />} />
            <Redirect to={url} />
        </Switch>
    )
}

export default Home