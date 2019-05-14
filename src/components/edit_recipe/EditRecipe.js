import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Edit1 from './Edit1'
import Edit2 from './Edit2'
import { connect } from 'react-redux'
import {refreshState} from '../../redux/auth_reducer'



class EditRecipe extends Component {

  render() {
    return (
      <div>
        Edit the recipe
        <div className="buttons_container">
        <Link to="/"><button onClick={()=>this.props.refreshState()}>cancel</button></Link>
        </div>
        <Switch>
          <Route component={Edit1} exact path="/editrecipe/edit1/:id" />
          <Route component={Edit2} exact path="/editrecipe/edit2/:id" />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = {
  refreshState
}

const mapStateToProps = (reduxState) => {

  return reduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe)
