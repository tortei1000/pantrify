import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { updateUsername } from "../redux/auth_reducer"

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
  getPantry=()=>{
    axios.get('/api/pantry').then((result) => {
      this.setState({ ingredients: result.data })
    })
  }

  removeFromList =(id)=>{
    axios.put(`/api/shoppinglist/${id}` ).then((res)=>{
      console.log(res.status)
    })
    this.getPantry()
  }

  removeFromPantry =(id)=>{
    axios.put(`/api/removepantry/${id}` ).then((res)=>{
      console.log(res.status)
    })
    this.getPantry()
  }

  render() {
    const { ingredients } = this.state
    const list = ingredients.map((ingredient) => {
      return (
        <>
          <li>{ingredient.name}</li>
          <li>{ingredient.quantity}</li>
          <li>{ingredient.unit}</li>
          <button onClick={()=>{this.removeFromPantry(ingredient.id)}}>remove item</button>
          
        </>
      )
    })
    return (
      <div>
        <h1>My Pantry</h1>
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