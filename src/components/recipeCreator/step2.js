import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { addIngredients } from "../../redux/auth_reducer"

class Step2 extends Component {
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

  createRecipe = () => {
    const { title, instructions, image,  ingredients } = this.props
    axios.post('/api/recipes', { title, instructions, image,  ingredients }).then(() => { 
      
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
          <Link to="/home"><button onClick={this.createRecipe}>Done</button></Link>
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
  addIngredients
}

const mapStateToProps = (reduxState) => {

  return reduxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Step2)

