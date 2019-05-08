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
      axios.get('/api/ingredients').then((result) => {
        this.setState({ ingredients: result.data })
      })
    })

  }

  render() {
    const { ingredients } = this.state
    const list = ingredients.map((ingredient) => {
      return (
        <>
          <li>{ingredient.name}</li>
          <li>{ingredient.quantity}</li>
          <li>{ingredient.unit}</li>
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