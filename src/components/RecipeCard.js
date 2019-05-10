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
        <div style={{ border: 'solid' }} >

          <li key={index} style={{ listStyle: 'none' }}>Recipe Title: {item.title}</li>
          <div ><img className="house_image"
            src={`https://images.unsplash.com/photo-1459682687441-7761439a709d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2010&q=80`}
            alt='broken' width='300px' /></div>


        </div>

      </div>
    )
  }
}