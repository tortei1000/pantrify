import React, { Component } from 'react'
import axios from 'axios';
require('dotenv').config()

const { S3KEY } = process.env
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
    console.log(this.props)
    return (
      <div >
        <div >
          <div ><img className="house_image"
            src={`https://s3-us-west-1.amazonaws.com/pantrify-images/hero/photo-1556040221-a1efce785fcc.jpeg${S3KEY}`}
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
          <button onClick={() => { this.props.updateRecipe(item) }}>Update</button>
        </div>
      </div>
    )
  }
}