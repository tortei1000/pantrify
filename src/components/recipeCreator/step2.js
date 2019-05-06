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
      quantity: '',
      unit: ''

    }
  }




  addIngredientsToState = () => {
    const { name, quantity, unit } = this.state
    const { title, instructions, ingredients } = this.props
    console.log(ingredients)
    this.props.addIngredients({ name, quantity, unit })

  }

  createRecipe = () => {
    const { title, instructions, ingredients } = this.props
    axios.post('/api/recipes', { title, instructions, ingredients }).then(() => {

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
          <input name="name" placeholder="name" onChange={this.handleChange} />
          <input name="quantity" placeholder="quantity" onChange={this.handleChange} />
          <input name="unit" placeholder="unit" onChange={this.handleChange} />

        </div>
        <div>
            <button onClick={this.addIngredientsToState}>add ingredients</button>
          <Link to="/home"><button onClick={this.createRecipe}>Done</button></Link>
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

