import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { addIngredients, refreshState } from "../../redux/auth_reducer"

class Edit2 extends Component {
  constructor() {

    super()
    this.state = {
      name: '',
      quantity: null,
      unit: ''

    }
  }

  addIngredientsToState = () => {
    const { name, quantity, unit } = this.state

    this.props.addIngredients({ name, quantity, unit })
    this.setState({
      name: "",
      quantity: null,
      unit: ""
    })

  }

  editRecipe = () => {
    const { title, instructions, ingredients } = this.props
    axios.put(`/api/recipes/${this.props.match.params.id}`, { title, instructions, ingredients }).then(() => {
      this.props.refreshState()  //why is this not working?
      this.props.history.push('/home')
    })
  }

  handleChange = (e) => {
    let { value, name } = e.target
    this.setState({
      [name]: value
    })
  }





  render() {
    return (
      <div className="create_container">

        <div className="input_container_create">
          <p>Ingredient name:</p>
          <input name="name" value={this.state.name} onChange={this.handleChange} />
          <p>Quantity:</p>
          <input name="quantity" value={this.state.quantity} onChange={this.handleChange} />
          <p>Unit:</p>
          <input name="unit" value={this.state.unit} onChange={this.handleChange} />

        </div>
        <div className="buttons_container">
          <button onClick={this.addIngredientsToState}>add ingredients</button>
          <button onClick={this.editRecipe}>Done</button>
        </div>
          {this.props.ingredients.map((ingredient) => {
            return (
              <>
                <div className="current_ingredients">
                  <div className="ingredients_container">
                    <p className="ingredient_name_container">{ingredient.name}</p>
                  </div>
                  <div className="quantity_unit_container">
                    <p className="ingredient_quantity_container">{ingredient.quantity}</p>
                    <p className="ingredient_unit_container">{ingredient.unit}</p>
                  </div>
                </div>
              </>)
          })}
        </div>
      
    )
  }
}

const mapDispatchToProps = {
  addIngredients, refreshState
}

const mapStateToProps = (reduxState) => {

  return reduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit2)

