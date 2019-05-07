import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Recipes from './Recipes'
import axios from 'axios';
import {updateUsername} from "../redux/auth_reducer"


class Home extends Component {
  constructor(){
    super()
    this.state = {
      userIn : false
    }
  }
  componentDidMount(){
    axios.get('/auth/users').then((res)=>{
      console.log(`this is res`, res)
      if(res.data.username){this.setState({userIn:true})}
      this.props.updateUsername(res.data.username)
    })
  }
  
  render(){
  

  
      return(
      <div>
        {this.state.userIn ? (
          <div>
            <h1>
              My Recipes
            </h1>
            <Recipes  /> 
          </div>
        ) : (
          <div >
            User not Logged in
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