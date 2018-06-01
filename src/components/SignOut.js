import React, { Component } from 'react';

import { auth } from '../firebase';



class SignOutButton extends Component {

  onClick = () => {
    auth.doSignOut()
    window.location = "/";
  }

  render(){
    return (
      <a href="#"
      type="button"
      onClick={this.onClick}
    >
      Sign Out
    </a>
    )
  }
}


export default SignOutButton;