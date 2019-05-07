import React, { Component } from 'react';
import axios from 'axios'


export default class Search extends Component {
  constructor() {
    super();
    
    this.state = {
      filterText: '',
     
    };

  
  }
  
  
  // searchRecipe = () => {
  //   console.log(this.state.filterText, 'look ')
  //   axios.get(`/api/recipes/?title=${this.state.filterText}`).then(res => {
      
  //     this.setState({
        
  //       recipes: res.data
  //     })
  //   }).catch(err => console.log("error", err))

  // }

  
  
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