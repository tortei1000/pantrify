import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { updateUsername } from "../redux/auth_reducer"
import { toast } from 'react-toastify';

class Pantry extends Component {

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
    this.getPantry()

  }
  getPantry = () => {
    axios.get('/api/pantry').then((result) => {
      this.setState({ ingredients: result.data })
    })
  }

  removeFromList = (id) => {
    axios.put(`/api/shoppinglist/${id}`).then((res) => {
      console.log(res.status)
    })
    this.getPantry()
  }

  removeFromPantry = (id) => {
    axios.put(`/api/removepantry/${id}`).then((res) => {
      console.log(res.status)
    })
    toast.success(`Removed ingredient from your pantry.`)
    this.getPantry()
  }

  render() {
    const { ingredients } = this.state
    const list = ingredients.map((ingredient, index) => {
      return (
        <div className="grid_container">
          <div key={index} className="shopping_container">
            <p className="ingredient_name_container">{ingredient.name}</p>
          </div>
          <div className="quantity_unit_container">
            <p className="ingredient_quantity_container">{ingredient.quantity}</p>
            <p className="ingredient_unit_container">{ingredient.unit}</p>
          </div>

          <div className="buttons_container">
            <button onClick={() => { this.removeFromPantry(ingredient.id) }}>remove item</button>
          </div>
        </div>
      )
    })
    return (
      <div>
        <h2 className="header_title">My Pantry</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pantry))