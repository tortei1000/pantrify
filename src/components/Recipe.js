import React, { Component } from 'react'


export default class Recipe extends Component {

  render() {
    const { item, index } = this.props
    console.log(this.props)
    return (
      <div >
        <div >
          <div ><img className="house_image" src={item.img}/></div>
          <li key={index} style={{ listStyle: 'none' }}>{item.title}</li>
          <li key={index} style={{ listStyle: 'none' }}>{item.instructions}</li>
         
        </div>
        <div >
          <button onClick={()=>this.props.deleteHouse(item)}></button>
        </div>
      </div>
    )
  }
}