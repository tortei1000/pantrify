import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Step1 from './step1'
import Step2 from './step2'



export default class Wizard extends Component {

  render() {
    return (
      <div>
        Create a new recipe!
        <Link to="/"><button>cancel</button></Link>
        
        <Switch>
          <Route component={Step1} exact path="/wizard/step1" />
          <Route component={Step2} exact path="/wizard/step2" />
        </Switch>
      </div>
    )
  }
}