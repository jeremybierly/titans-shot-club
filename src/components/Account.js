import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import FormButton from './FormButton';
import FormInput from './FormInput';
import '../style.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: 0,
      attempts: 0
    };
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
        userName: userNameValue,
        userGrade: gradeValue,
        when: time
      }
      profileRef.update(profile);
    }
  }

  render() {
    let user = this.props.authUser ? this.props.authUser.uid : ""
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>My Account</legend>
          <FormInput label="User Name" id="username" />
          <div class="selectInput">
            <label>Grade Level</label>
            <select name="grade" id="grade">
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
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