import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Recipe from './Recipe'
import { connect } from 'react-redux'
import { updateUserId, updateUsername } from '../redux/auth_reducer'
import RecipeCard from './RecipeCard'
import Search from './Search';



class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      user: '',
      recipeSelected: false,
      selectedId: null
    }
  }

  componentDidMount() {
    this.getRecipes()
  }
  
  getRecipes = () => {
    console.log(`get recipes is running`)
    axios.get('/api/recipes').then((res) => {
      this.setState({
        recipes: res.data
      })

    })
  }

  searchRecipe = (text) => {
    
    axios.get(`/api/recipes/?title=${text}`).then(res => {
      
      this.setState({

        recipes: res.data
      })
    }).catch(err => console.log("error", err))

  }

  deleteRecipe = (item) => {
    axios.delete(`/api/recipes/${item.id}`).then(res => {
      this.setState({
        recipes: res.data
      })
    })
    this.getRecipes()
    this.setState({
      recipeSelected: false
    })
  }

  updateRecipe = (item) => {
    axios.put(`/api/recipes/${item.id}`).then(res => {
      this.setState({
        recipes: res.data
      })
    })
  }



  render() {
    let { recipes } = this.state

    return (
      <>{this.state.recipeSelected ?
        <Recipe item={this.state.selectedId} index={1}
          deleteRecipe={this.deleteRecipe} /> :
        <div>
          <Search searchRecipe={this.searchRecipe}/>
          <Link to="/wizard/step1"><button >Create new recipe</button></Link>
          {recipes[0] ? recipes.map((item, index) => {

            return (
              <div key={index} onClick={() => {
                this.setState({
                  recipeSelected: true,
                  selectedId: item
                })
              }}>
                <RecipeCard item={item} index={index} />

              </div>
            )
          }) : null
          }


        </div>}

      </>
    )
  }
}
const mapDispatchToProps = {
  updateUserId, updateUsername
}

const mapStateToProps = (reduxState) => {

  return reduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
