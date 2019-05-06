import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

class Step1 extends Component {
  constructor() {
    
    super()
    this.state = {
      title: '',
      instructions: '' 
      
    }
  }

  
  

  addRecipe = () => {
    const {title, instructions} = this.state
    const {user_id} = this.props
    axios.post('/api/recipes', {user_id, title, instructions})
    
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
          <input name="title" placeholder="title" onChange={this.handleChange} />
          <input name="instructions" placeholder="instructions" onChange={this.handleChange} />
          
        </div>
        <div>

          <Link to="/wizard/Step2"><button onClick={this.addRecipe}>next</button></Link>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (reduxState) => {
  const { username, user_id } = reduxState
  return { username, user_id }
}

export default connect(mapStateToProps)(Step1)

