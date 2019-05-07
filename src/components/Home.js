import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Recipes from './Recipes'
import axios from 'axios';


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
      if(res.data[0].username){this.setState({userIn:true})}
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


const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Home))