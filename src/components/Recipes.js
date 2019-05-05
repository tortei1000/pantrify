import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Recipe from './Recipe'


export default class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    this.getRecipes()
  }
  getRecipes = () => {
    axios.get('/api/recipes').then((res) => { //this is getting the right data

      this.setState({
        recipes: res.data
      })

    })
  }
  deleteRecipe = (item) => {
    axios.delete(`/api/recipes/${item.id}`).then(res => {

    })
    this.getRecipes()
  }

  


  render() {
    let { recipes } = this.state
    console.log(recipes, "houses in the start of render")

    return (
      <div>
        <Link to="/wizard/step1"><button className="dash_button">Create new recipe</button></Link>
        {recipes[0] ? recipes.map((item, index) => {
          return (
            <div >
              <Recipe item={item} index={index} deleteRecipe={this.deleteRecipe} />

            </div>
          )
        }) : null
        }


      </div>
    )
  }
}