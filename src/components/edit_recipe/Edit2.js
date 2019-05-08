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
      <div>
        Wizard

        <div>
          <input name="name" placeholder="name" value={this.state.name} onChange={this.handleChange} />
          <input name="quantity" placeholder="quantity" value={this.state.quantity} onChange={this.handleChange} />
          <input name="unit" placeholder="unit" value={this.state.unit} onChange={this.handleChange} />

        </div>
        <div>
          <button onClick={this.addIngredientsToState}>add ingredients</button>
          <button onClick={this.editRecipe}>Done</button>
          {this.props.ingredients.map((ingredient) => {
            return (
              <>
                <p>{ingredient.name}</p>
                <p>{ingredient.quantity}</p>
                <p>{ingredient.unit}</p>

              </>)
          })}
        </div>
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

