import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Recipes from './Recipes'

class Home extends Component {
  


  render(){
    if(this.props.username){
      return(
      <div>
        <Recipes/>
      </div>
    )} 
      return <div>you are not logged in</div>
    

  }
}

const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Home))