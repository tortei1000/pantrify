import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Recipe from './Recipe'
import { connect } from 'react-redux'
import {updateUserId, updateUsername} from '../redux/auth_reducer'



class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      user: ''
    }
  }

  componentDidMount() {  //use action creators, connect to redux, use res.data as payload
    this.getRecipes()
    axios.get('/auth/users').then(res=>{
      console.log(res.data)
      // this.props.updateUserId(res.id)
      // this.props.updateUsername(res.data.username)
    })
  }
  getRecipes = () => {
    console.log(`get recipes is running`)
    axios.get('/api/recipes').then((res) => { 
      this.setState({
        recipes: res.data
      })

    })
  }
  deleteRecipe = (item) => {
    axios.delete(`/api/recipes/${item.id}`).then(res => { 
      this.setState({
        recipes:res.data
      })
    })
    this.getRecipes()
  }

  updateRecipe = (item) => {
    axios.put(`/api/recipes/${item.id}`).then(res => {
      this.setState({
        recipes: res.data
      })
    })
  }

  render() {
    let { recipes } = this.state //I want to have a recipe card, it needs the info from this map, how do I pass it? do I make it 
    //child or can I make it a grandchild
    
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
const mapDispatchToProps = {
  updateUserId, updateUsername
}

const mapStateToProps = (reduxState) => {

  return reduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
