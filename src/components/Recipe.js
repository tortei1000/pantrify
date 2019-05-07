import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
require('dotenv').config()


export default class Recipe extends Component { 
  constructor() {
    super()
    this.state = {
      ingredients: ['ait']
    }
  }
  componentDidMount() {
    axios.get(`/api/ingredients/${this.props.item.id}`).then(res => {
      this.setState({
        ingredients: res.data
      })
    })
  }

  render() {
    const { item, index } = this.props
    
    return ( 
      <div >
        <div style={{border:'solid'}} >
          
          <div ><img className="house_image"
            src={`https://images.unsplash.com/photo-1459682687441-7761439a709d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2010&q=80`}
            alt='broken' width='300px' /></div>
          <li key={index} style={{ listStyle: 'none' }}>Recipe Title: {item.title}</li>
          <li key={index} style={{ listStyle: 'none' }}>Instruction: {item.instructions}</li>
          <li key={index} style={{ listStyle: 'none' }}>Ingredients: {this.state.ingredients.map((ingredient) => {
            return (
              <div>
                <p>{ingredient.name}</p>
                <p>{ingredient.quantity}</p>
                <p>{ingredient.unit}</p>
              </div>
            )

          })}</li>

        </div>
        <div >
          <button onClick={() => { this.props.deleteRecipe(item) }}>Delete</button>
          <Link to={`/editrecipe/edit1/${item.id}`}><button>Edit Recipe</button></Link>
          
        </div>
      </div>
    )
  }
}