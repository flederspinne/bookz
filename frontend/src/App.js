import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import links from './common/helpers/links'

import Header from './common/components/Header/Header'
import Auth from './pages/auth'
import Home from './pages/home'

const App = () => {

    const [ user, setUser ] = useState(undefined)

    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch('http://localhost:4000/api/users/id', {
                withCredentials: true,
                credentials: 'include',
            })

            return await response.json()
        }

        fetchUser()
            .then((data) => setUser(data))
    })

  return (
    <Fragment>
        <Header user={user} />
        <Router>
            <Switch>
                <Route path={links.auth} component={Auth} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    </Fragment>
  );
}

export default App;
