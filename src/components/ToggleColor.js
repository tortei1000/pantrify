import React, { Component } from 'react'




export default class ToggleColor extends Component {
  constructor() {
    super()
    this.state = {
      isInPantry: false,
      searchArray: []
    }
  }


  render() {

    console.log(this.props.filter)
    return (
      <>
        {this.props.filter.map((meal, index) => {
          console.log(meal)
          return <>
            <p className="recipe_title"
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