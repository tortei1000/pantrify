import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { updateUsername } from "../redux/auth_reducer"
import { toast } from 'react-toastify';

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
  getIngredients = () => {
    axios.get('/api/ingredients').then((result) => {
      
      this.setState({ ingredients: result.data })
    })
  }

  removeFromList = (id) => {
    axios.put(`/api/shoppinglist/${id}`).then((res) => {
      console.log(res.status)
    })
    this.getIngredients()
    
  }

  addToPantry = (id) => {
    axios.put(`/api/addtopantry/${id}`).then((res) => {
      console.log(res.status, id)
    })
    this.removeFromList(id)
    this.getIngredients(id)
    toast.success(`You have added this ingredient to your pantry`)
  }

  render() {
    const { ingredients } = this.state
    const list = ingredients.map((ingredient) => {
      return (
        <>
          <div className="shopping_container">
            <p className="ingredient_name_container">{ingredient.name}</p>
            <div className="quantity_unit_container">
              <p className="ingredient_quantity_container">{ingredient.quantity}</p>
              <p className="ingredient_unit_container">{ingredient.unit}</p>
            </div>

          </div>
          <div className="buttons_container">
            <button onClick={() => { this.addToPantry(ingredient.id) }}>add to pantry</button>
            <button onClick={() => { this.removeFromList(ingredient.id) }}>remove from list</button>
          </div>
        </>
      )
    })
    return (
      <div>
        <h2 className="header_title">Shopping List</h2>
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