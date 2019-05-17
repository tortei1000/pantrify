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
    let idArray = this.props.isInPantry.map((item) => { return item.id })


    return (
      <>
        <div className="header_day_container">
          <div className="header_mealer">Choose the recipe to cook on:</div>
          <div className="day">
            {this.props.day.toUTCString()}
          </div>
        </div>
        <p>if your recipe is <p style={{ color:"green" }}>green</p>
        <p>you have all the ingredients necessary to cook it in
          your pantry, otherwise the recipe will be </p>
        <p style={{ color:'red' }}>red.</p></p>


        {this.props.isInPantry && allRecipes.map((recipe, index) => {
          let green = idArray.includes(recipe.id)
          console.log(`look at me ${recipe.id}`)
          return (
            <div className="recipe_button_container">

              <li style={green ? { color: "green" } : { color: "red" }} onClick={() => this.props.selectedRecipe(day, recipe.title, recipe.id)} key={index}>{recipe.title}</li>
            </div>
          )

        })}

        <div className="buttons_container">
          <button onClick={() => this.props.onDateClick()}>go back</button>
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