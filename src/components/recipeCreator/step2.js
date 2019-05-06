import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

class Step2 extends Component {
  constructor() {
    
    super()
    this.state = {
      name: '',
      quantity: '',
      unit: '' 
      
    }
  }

  
  

  addIngredients = () => {
    const {name, quantity, unit} = this.state
    const {recipe_id} = this.props
    axios.post('/api/recipes', {recipe_id, name, quantity, unit})
    
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

          <Link to="/home"><button onClick={this.addIngredients}>next</button></Link>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (reduxState) => {
  const { username, user_id } = reduxState
  return { username, user_id }
}

export default connect(mapStateToProps)(Step2)

