import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userEmail = this.props.authUser ? this.props.authUser.email : ""
    console.log(this.props.authUser)
    return (
      <div>
        <h1>{userEmail}</h1>
      </div>);
  }
}
export default Home;