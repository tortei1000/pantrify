import React, { Component } from 'react';
import axios from 'axios'


export default class Search extends Component {
  constructor() {
    super();
    
    this.state = {
      filterText: '',
     
    };

  this.searchRecipe = this.searchRecipe.bind(this)  
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
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={(e)=>this.handleChange(e)} placeholder="Search Your Recipes" />
          
          <button className="searchbutton"  onClick={this.searchRecipe}>Search</button>
          
        </div>
        
      </section>
    )
  }
}