import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Edit1 from './Edit1'
import Edit2 from './Edit2'



export default class EditRecipe extends Component {

  render() {
    return (
      <div>
        Edit the recipe
        <Link to="/"><button>cancel</button></Link>
        
        <Switch>
          <Route component={Edit1} exact path="/editrecipe/edit1/:id" />
          <Route component={Edit2} exact path="/editrecipe/edit2/:id" />
        </Switch>
      </div>
    )
  }
}