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
      <div>
        Wizard

        <div>
          <input name="title" placeholder="title" onChange={this.handleChange} />
          <textarea style={{height:'300px', width:"300px"}} name="instructions" placeholder="instructions" onChange={this.handleChange} />
          <AmazonS3 />

        </div>
        <div>

          <Link to="/wizard/Step2"><button onClick={this.addRecipe}>next</button></Link>
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

