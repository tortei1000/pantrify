import React, { Component } from 'react';
import axios from 'axios'


export default class Search extends Component {
  constructor() {
    super();
    
    this.state = {
      filterText: '',
     
    };

  this.searchRecipe = this.searchRecipe.bind(this)  //verify how search should work, should I use redux
  }
  
  
  searchRecipe = (text) => {

    axios.get(`/api/recipes/?title=${text}`).then(res => {

      this.setState({
        recipes: res.data
      })
    }).catch(err => console.log("error", err))

  }
  
  handleChange(e){
    this.setState({filterText:e.target.value})
    
   }
  
  
  render() {
    
    return (
      <section >

        <div >
          <input onChange={(e)=>this.handleChange(e)} placeholder="Search Your Recipes" />
          
          <button onClick={this.searchRecipe}>Search</button>
          
        </div>
        
      </section>
    )
  }
}