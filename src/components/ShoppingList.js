import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { updateUsername } from "../redux/auth_reducer"

class ShoppingList extends Component {

  constructor() {  
    super()
    this.state = {
      ingredients: []
    }
  }

  componentDidMount() {
    axios.get('/auth/users').then((res) => {
      this.props.updateUsername(res.data.username)
    })
    this.getIngredients()

  }
  getIngredients=()=>{
    axios.get('/api/ingredients').then((result) => {
      this.setState({ ingredients: result.data })
    })
  }

  removeFromList =(id)=>{
    axios.put(`/api/shoppinglist/${id}` ).then((res)=>{
      console.log(res.status)
    })
    this.getIngredients()
  }

  addToPantry = (id) => {
    axios.put(`/api/addtopantry/${id}`).then((res)=>{
      console.log(res.status)
    })
    this.removeFromList(id)
    this.getIngredients(id)
  }

  render() {
    const { ingredients } = this.state
    const list = ingredients.map((ingredient) => {
      return (
        <>
          <li>{ingredient.name}</li>
          <li>{ingredient.quantity}</li>
          <li>{ingredient.unit}</li>
          <button onClick={()=>{this.addToPantry(ingredient.id)}}>add to pantry</button>
          <button onClick={()=>{this.removeFromList(ingredient.id)}}>remove from list</button>
        </>
      )
    })
    return (
      <div>
        <h1>Shopping List</h1>
        {list}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShoppingList))