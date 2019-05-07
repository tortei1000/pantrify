import React, { Component } from 'react';
import axios from 'axios'


export default class Search extends Component {
  constructor() {
    super();
    
    this.state = {
      filterText: '',
     
    };

  
  }
  
  handleChange(e){
    console.log(e.target.value)
    this.setState({filterText:e.target.value})
    
   }
  
  
  render() {
    
    return (
      <section >

        <div >
          <input onChange={(e)=>this.handleChange(e)} placeholder="Search Your Recipes" />
          
          <button onClick={()=>this.props.searchRecipe(this.state.filterText)}>Search</button>
          
        </div>
        
      </section>
    )
  }
}