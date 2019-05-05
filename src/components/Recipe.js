import React, { Component } from 'react'


export default class Recipe extends Component {

  render() {
    const { item, index } = this.props
    console.log(this.props)
    return (
      <div >
        <div >
          <div ><img className="house_image" src={item.img}/></div>
          <li key={index} style={{ listStyle: 'none' }}>Recipe Title: {item.title}</li>
          <li key={index} style={{ listStyle: 'none' }}>Instruction: {item.instructions}</li>
          <li key={index} style={{ listStyle: 'none' }}>Ingredients: {item.name}</li>
         
        </div>
        <div >
          <button onClick={()=>this.props.deleteRecipe(item)}></button>
        </div>
      </div>
    )
  }
}