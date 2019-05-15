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
      <ul key={10} className="hamburger_container">
        
        <li className="link_container" key={1}><Link to='/home' className="link_text">MY RECIPES</Link></li>
        <li className="link_container" key={2}><Link to='/shoppinglist' className="link_text">SHOPPING LIST</Link></li>
        <li className="link_container" key={3}><Link to='/pantry' className="link_text">PANTRY</Link></li>
        <li className="link_container"key={4}><Link to='/calendar' className="link_text">CALENDAR</Link></li>
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
        <div key={6} className="mobile_nav">
          <p  key={8} onClick={this.handleNavClick.bind(this)}><i key={9} className="material-icons">view_headline</i></p>
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
        {this.renderNavigation()}
        
      </div>
    )
  }
}