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
            <h2 className="header_title">
              My Recipes
            </h2>
            <Recipes />
            
          </div>
        ) : (
          <>
            <div className='toggleSlider'>
              <SimpleSlider />
            </div>
            <div className="notSlider">
              <div className='slider_container'></div>
              <div className='slider_container2'></div>
              <div className='slider_container3'></div>
            </div>
          </>
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