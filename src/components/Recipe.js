import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'




class Recipe extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      ingredients: []
    }
  }
  componentDidMount() {
    axios.get(`/api/ingredients/${this.props.item.id}`).then(res => {
      this.setState({
        ingredients: res.data
      })
    })
  }

  sendToList = () => {
    axios.put(`/api/ingredients/${this.props.item.id}`).then((res) => {
      console.log(res.status)
    })
  }

  render() {
    const { item, index } = this.props


    return (
      <>
        <div className="recipe_container" >

          <li className="title_container" key={index} style={{ listStyle: 'none' }}>{item.title}</li>
          <div className="image_container_in_recipe" style={{backgroundImage: `url(${item.images})`}}></div>
          <li className="instruction_container" key={index} style={{ listStyle: 'none' }}>
            <p className="subheader_container">Instructions:</p>
            {item.instructions}</li>
          <li key={index} style={{ listStyle: 'none' }}>
            <p className="subheader_container">Ingredients: </p>
            {this.state.ingredients.map((ingredient) => {
              return (
                <div className="ingredients_container">
                  <p className="ingredient_name_container" >{ingredient.name}</p>
                  <div className="quantity_unit_container">
                    <p className="ingredient_quantity_container" >{ingredient.quantity}</p>
                    <p className="ingredient_unit_container" >{ingredient.unit}</p>
                  </div>
                </div>
              )

            })}</li>

        </div>
        <div className="buttons_container">
          <Link to={`/editrecipe/edit1/${item.id}`}><button>Edit Recipe</button></Link>
          <button onClick={this.sendToList}>Add to List</button>
          <button onClick={() => { this.props.deleteRecipe(item) }}>Delete</button>
          <button onClick={this.props.toggleRecipeSelected}>Back</button>

        </div>
      </>
    )
  }
}
const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Recipe))