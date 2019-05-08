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

  sendToList =()=>{
    axios.put(`/api/ingredients/${this.props.item.id}` ).then((res)=>{
      console.log(res.status)
    })
  }

  render() {
    const { item, index } = this.props
    
    return ( 
      <div >
        <div style={{border:'solid'}} >
          
          <div ><img className="house_image"
            src={`https://images.unsplash.com/photo-1459682687441-7761439a709d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2010&q=80`}
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
          <Link to={`/editrecipe/edit1/${item.id}`}><button>Edit Recipe</button></Link>
          <button onClick={()=>this.props.history.goBack()}>cancel</button>
          <button onClick={this.sendToList}>Add to List</button>
          
        </div>
      </div>
    )
  }
}
const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Recipe))