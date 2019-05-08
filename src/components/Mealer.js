import React, {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateUsername} from "../redux/auth_reducer"

class Mealer extends Component {
  constructor(){
    super()
    this.state = {
      allRecipes: []
    }
  }

  componentDidMount() {
    console.log(`I m running yo`)
    axios.get('/auth/users').then((res)=>{
         
      this.props.updateUsername(res.data.username)
    }).catch((err)=>{console.log(err)})
    this.getRecipes()
  }

  getRecipes = () => {
    
    axios.get('/api/recipes').then((res) => {
      this.setState({
        allRecipes: res.data
        
      })

    })
  }

  render(){
    const {allRecipes} = this.state
    const {day} = this.props
    console.log(allRecipes)
    let renderRecipes = allRecipes.map((recipe, index)=>{
      return(
        <>
        <p onClick={()=>this.props.selectedRecipe(day, recipe)} key={index}>{recipe.title}</p>
        </>
      )
    })
    return(
      <>
      <div style={{fontSize:'30px'}}>{this.props.day.toUTCString()}</div>
      <div>{renderRecipes}</div>
      <button onClick={()=>this.props.onDateClick()}>go back</button>
      </>
    )
  }

} 

const mapDispatchToProps = {
  updateUsername
}

const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Mealer))