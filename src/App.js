import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import links from './common/helpers/links'
import api from './common/helpers/api'
import { getCookie } from './common/helpers'

import Header from './common/components/Header/Header'
import Auth from './pages/auth'
import Home from './pages/home'

import s from './App.module.scss'


const App = () => {

    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch(api.usersMe, {
                withCredentials: true,
                credentials: 'include',
            })

            if (response.status === 403) {
                return null
            }

            return await response.json()
        }

        if (getCookie('connect.sid')) {
            fetchUser()
                .then((data) => setUser(data))
        }
    }, [])

  return (
    <Fragment>
        <Header user={user} setUser={setUser} />

        <div className={s.main}>
            <Router>
                <Switch>
                    <Route path={links.auth} render={(props) => <Auth setUser={setUser} {...props} /> } />
                    <Route path={links.home} component={Home} />
                </Switch>
            </Router>
        </div>
    </Fragment>
  );
}

export default App;
