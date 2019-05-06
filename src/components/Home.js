import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Recipes from './Recipes'


const Home = (props) => {
  const {username} = props
  

   //<Recipes /> is not rendering correctly because my sql file is not selecting a user id 
    
      return(
      <div>
        {username ? (
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

  


const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Home))