import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from './components/forms/Register'
import Home from './components/Home'
import Login from './components/forms/Login'
import NewUser from './components/forms/NewUser';
import Wizard from './components/recipeCreator/Wizard';

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={() => (
      <Login>
        <Register />
      </Login>
    )} />
    <Route path='/register' component={NewUser} />
    <Route path='/home' component={Home} />
    <Route path='/wizard' component={Wizard} />
  </Switch>
)