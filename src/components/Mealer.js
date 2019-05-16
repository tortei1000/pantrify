import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUsername } from "../redux/auth_reducer"

class Mealer extends Component {
  constructor() {
    super()
    this.state = {
      allRecipes: []
    }
  }

  componentDidMount() {
    
    axios.get('/auth/users').then((res) => {

      this.props.updateUsername(res.data.username)
    }).catch((err) => { console.log(err) })
    this.getRecipes()
  }

  getRecipes = () => {

    axios.get('/api/recipes').then((res) => {
      
      this.setState({
        allRecipes: res.data
               
      }) 
    })
  }

  render() {
    const { allRecipes } = this.state
    const { day } = this.props
    


    return (
      <>
        <div className="header_day_container">
          <div className="header_mealer">Choose the recipe to cook on:</div>
          <div className="day">
            {this.props.day.toUTCString()}
          </div>
        </div>

        {allRecipes.map((recipe, index) => {
          console.log(`look at me ${recipe.id}`)
          return (
            <div className="recipe_button_container">

              <li onClick={() => this.props.selectedRecipe(day, recipe.title, recipe.id)} key={index}>{recipe.title}</li>
            </div>
          )

        })}

        <div className="buttons_container">
          <button  onClick={() => this.props.onDateClick()}>go back</button>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Mealer))