import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Step1 from './step1'
import Step2 from './step2'
import { connect } from 'react-redux'
import {refreshState} from '../../redux/auth_reducer'


class Wizard extends Component {

  render() {
    return (
      <div>
        <p className="create_edit_header">Create a new recipe!</p>
        <div className="buttons_container_create_cancel">
        <Link to="/"><button onClick={()=>this.props.refreshState()}>cancel</button></Link>
        </div>
        <Switch>
          <Route component={Step1} exact path="/wizard/step1" />
          <Route component={Step2} exact path="/wizard/step2" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)
