import React, { Component } from 'react'
require('dotenv').config()

const {S3KEY} = process.env
export default class Recipe extends Component {

  render() {
    const { item, index } = this.props
    console.log(this.props)
    return (
      <div >
        <div >
          <div ><img className="house_image" 
          src={`https://s3-us-west-1.amazonaws.com/pantrify-images/hero/photo-1556040221-a1efce785fcc.jpeg${S3KEY}`}
          alt='broken' width='300px'/></div>
          <li key={index} style={{ listStyle: 'none' }}>Recipe Title: {item.title}</li>
          <li key={index} style={{ listStyle: 'none' }}>Instruction: {item.instructions}</li>
          <li key={index} style={{ listStyle: 'none' }}>Ingredients: {item.name}</li>
         
        </div>
        <div >
          <button onClick={()=>{this.props.deleteRecipe(item)}}>Delete</button>
          <button onClick={()=>{this.props.updateRecipe(item)}}>Update</button>
        </div>
      </div>
    )
  }
}