import React, { Component } from 'react'
import axios from 'axios'
import { ENGINE_METHOD_ALL } from 'constants';


export default class ToggleColor extends Component {
  constructor() {
    super()
    this.state = {
      isInPantry: false,
      searchArray: []
    }
  }

  // componentDidMount() {
  //   console.log(this.props.meals)
  //   // this.props.meals.map((meal) => { return this.toggleColor(meal.recipe) })


  // }

  // toggleColor = (title) => {
  //   axios.get(`/api/calendar/${title}`).then((res) => {
      
  //   })
  // }

  render() {
    // console.log(this.toggleColor(this.props.filter[0].recipe))
    let filteredMeal = this.props.filter.map((meal) => {
      return <p style={{ color:'green' }}>{meal.recipe}</p>
    })
    return (
      <>
        {/* {this.props.filter.map((meal) => {
          return <p style={this.state.isInPantry ? { color: "green" } : { color: "red" }}>{meal.recipe}</p>
        })} */}
        {filteredMeal}
      </>
    )
  }
}