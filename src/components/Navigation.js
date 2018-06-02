import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import '../styles/navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  


  render() {
    const NavigationAuth = () =>

      <nav className="mobile-nav-wrap" role="navigation">
        <ul className="mobile-header-nav">
          <li><Link to={routes.SHOT_TRACKER}>Track Shots</Link></li>
          <li><Link to={routes.HOME}>Home</Link></li>
          <li><Link to={routes.ACCOUNT}>Account</Link></li>
          <li><SignOutButton /></li>
        </ul>
      </nav>

    const NavigationNonAuth = () =>

      <nav className="mobile-nav-wrap" role="navigation">
        <ul className="mobile-header-nav">
          <li><Link to={routes.LANDING}>Landing</Link></li>
          <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        </ul>
      </nav>

    return (
      <header className={this.props.navOpen} onClick={this.props.trigger}>
        {this.props.authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
        }
        <a className="mobile-menu-toggle js-toggle-menu hamburger-menu" href="#">
          <span className="menu-item"></span>
          <span className="menu-item"></span>
          <span className="menu-item"></span>
        </a>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    )
  }

}


export default Navigation;