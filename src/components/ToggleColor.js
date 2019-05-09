import React, { Component } from 'react'
import axios from 'axios'



export default class ToggleColor extends Component {
  constructor() {
    super()
    this.state = {
      isInPantry: false,
      searchArray: []
    }
  }

  

  render() {
    
    // let filteredMeal = this.props.filter.map((meal, index) => {
    //   return (<>
    //     <p style={{ color: 'green' }}>{meal.recipe}</p>
    //     <button onClick={()=>this.props.removeRecipe(index)}>remove recipe</button>
    //   </>)
    // })
    return (
      <>
        {this.props.filter.map((meal, index) => {
          
          return <><p style={this.state.isInPantry ? {color: "green" } : { color: "red" }}>{meal.recipe}
          <div><button onClick={()=>this.props.removeRecipe(meal.id)}>clear</button></div></p>
        </>})}
        {/* {filteredMeal} */}
      </>
    )
  }
}