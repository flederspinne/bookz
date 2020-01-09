import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import links from './common/helpers/links'

import Header from './common/components/Header/Header'
import Auth from './pages/auth'
import Home from './pages/home'

function App() {
  return (
    <Fragment>
        <Header />
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
