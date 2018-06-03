import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import FormButton from './FormButton';
import '../style.css';

const INITIAL_STATE = {
  email: "",
  grade: "",
  username: "",
};

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    event.preventDefault();
    const time = new Date().getTime();
    const user = event.target.user.value;
    const userNameValue = event.target.username.value || "";
    const gradeValue = parseInt(event.target.grade.value || "");
    if (userNameValue === "") {
      window.alert("Error: Please Enter a User Name");
    } else if (gradeValue === "") {
      window.alert("Error: Please Enter a Grade Level");
    } else if (user === "") {
      window.alert("Error: You must be logged in to update your profile");
    } else {
      const usersRef = firebase.database().ref("users/" + user);
      const profileRef = usersRef.child("profile")
      const profile = {
        username: userNameValue,
        grade: gradeValue,
        when: time
      }
      profileRef.update(profile);
    }
  }

  handleUserNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  componentDidMount() {
    let user = this.props.authUser ? this.props.authUser.uid : ""
    const usersRef = firebase.database().ref(`users/${user}/profile`);
    usersRef.on('value', snap => {
      const data = snap.val();
      if (data !== null) {
        console.log(data);
        this.setState(data);
      }
    })
  }
  render() {
    let user = this.props.authUser ? this.props.authUser.uid : ""
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>My Account</legend>
          <div className="formInput">
            <label htmlFor="username">Full Name</label>
            <input onChange={this.handleUserNameChange} type="text" value={this.state.username} id="username" name="username" placeholder="Full Name" />
          </div>
          <div className="selectInput">
            <label>Grade Level</label>
            <select name="grade" id="grade">
              <option value={this.state.grade}>{this.state.grade}</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <input type="hidden" name="user" id="user" value={user} />
          <FormButton text="Save" label="submit" id="submit" />
        </fieldset>
      </form>
    );
  }
}

export default Account;