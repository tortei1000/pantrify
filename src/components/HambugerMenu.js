import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class HamburgerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      mobileNavVisible: false
    };
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  navigationLinks() {
    return [
      <ul>
        
        <li key={1}><Link to='/home'>my recipes</Link></li>
        <li key={2}><Link to='/shoppinglist'>shopping list</Link></li>
        <li key={3}><Link to='/pantry'>Pantry</Link></li>
        <li key={4}><Link to='/calendar'>Calendar</Link></li>
      </ul>
    ];
  }

  renderMobileNav() {
    if(this.state.mobileNavVisible) {
      return this.navigationLinks();
    }
  }
  
  handleNavClick() {
    if(!this.state.mobileNavVisible) {
      this.setState({mobileNavVisible: true});
    } else {
      this.setState({mobileNavVisible: false});
    }
  }

  renderNavigation() {
    if(this.state.windowWidth <= 1080) {
      return [
        <div className="mobile_nav">
          <p onClick={this.handleNavClick.bind(this)}><i class="material-icons">view_headline</i></p>
          {this.renderMobileNav()}
        </div>
      ];
    } else {
      return [
        <div key={7} className="nav_menu">
          {this.navigationLinks()}
        </div>
      ]; 
    }
  }

  render() {
    return(
      <div className="nav_container">
        <div className="site_title"><Link to="/">Pantrify</Link></div>
        {this.renderNavigation()}
      </div>
    )
  }
}