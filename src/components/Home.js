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
      
    }
  }
  componentDidMount(){
    axios.get('/auth/users').then((res)=>{
         
      this.props.updateUsername(res.data.username)
    }).catch((err)=>{console.log(err)})
  }
  
  render(){
  

  
      return(
      <div>
        {this.props.username ? (
          <div>
            <h1>
              My Recipes
            </h1>
            <Recipes  /> 
          </div>
        ) : (
          <div >
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" width="1200px" alt="error"/>
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