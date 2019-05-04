import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from './components/forms/Register'
import Home from './components/Home'
import Login from './components/forms/Login'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
    <Route path='/login' component={() => (
      <Login>
        <Register />
      </Login>
    )} />
    </Switch>
)