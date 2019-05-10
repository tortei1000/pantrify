import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Recipes from './Recipes'
import axios from 'axios';
import { updateUsername } from "../redux/auth_reducer"

import SimpleSlider from './SimpleSlider';


class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    axios.get('/auth/users').then((res) => {
      this.props.updateUsername(res.data.username)
    }).catch((err) => { console.log(err) })
  }

  render() {



    return (
      <div>
        {this.props.username ? (
          <div>
            <h1>
              My Recipes
            </h1>
            <Recipes />
            
          </div>
        ) : (
            <div >

              <SimpleSlider />
            </div>
          )}

      </div>
    )

  }

}
const mapDispatchToProps = {
  updateUsername
}

const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))