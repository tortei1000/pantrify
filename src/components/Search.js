import React, { Component } from 'react';



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

        <div className="search_container">
          <input className="search_input" onChange={(e)=>this.handleChange(e)} placeholder="Search Your Recipes" />
          
          <i class="fas fa-search" onClick={()=>this.props.searchRecipe(this.state.filterText)}></i>
          
        </div>
        
      </section>
    )
  }
}