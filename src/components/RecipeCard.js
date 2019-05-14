import React, { Component } from 'react'
import axios from 'axios';
require('dotenv').config()


export default class RecipeCard extends Component {
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
        <div className="recipe_card_container">

          <li className="title_container" key={index} style={{ listStyle: 'none' }}>{item.title}</li>
          <div className="image_container" style={{backgroundImage: `url(${item.images})`}}></div>


        </div>

      </div>
    )
  }
}