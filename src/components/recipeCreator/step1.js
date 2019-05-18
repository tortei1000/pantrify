import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createRecipeTitle } from '../../redux/auth_reducer'
import AmazonS3 from '../../components/AmazonS3'
class Step1 extends Component {
  constructor() {

    super()
    this.state = {
      title: '',
      instructions: '',


    }
  }

  addRecipe = () => {
    const { title, instructions } = this.state
    const { user_id } = this.props
    this.props.createRecipeTitle({ user_id, title, instructions })

  }
  handleChange = (e) => {
    let { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="create_container">
        <div className="input_container_create">
          <p>Recipe Title:</p>
          <input name="title" onChange={this.handleChange} />
          <p>Cooking Directions:</p>
          <textarea name="instructions" onChange={this.handleChange} />
          
            <AmazonS3 />
          
        </div>
        <div  className="buttons_container">

          <Link to="/wizard/Step2"><button className="next_button" onClick={this.addRecipe}>next</button></Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createRecipeTitle
}

const mapStateToProps = (reduxState) => {
  const { username, user_id } = reduxState
  return { username, user_id }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1)

