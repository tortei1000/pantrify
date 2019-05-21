import React, { Component } from 'react'




export default class ToggleColor extends Component {
  constructor() {
    super()
    this.state = {
      isInPantry: [],
      searchArray: []
    }
  }


  render() {
    let idArray = this.props.isInPantry.map((item)=>{return item.id})
    
    
    return (
      <>
        
        {this.props.isInPantry && this.props.filter.map((meal, index) => {
          let green = idArray.includes(meal.recipe_id)
          return <>
            <p className="recipe_title" style={green ? {color:"green"}:{color:"red"}}
              key={index} >{meal.recipe}
              <div>
                <button className="button_clear" onClick={() => this.props.removeRecipe(meal.id)}>clear</button>
              </div>
            </p>
          </>
        })}

      </>
    )
  }
}