import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import FormButton from './FormButton';
import NumberInput from './NumberInput';
import '../style.css';

class ShotTracker extends Component {
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
    const shotsMade = parseInt(event.target.makes.value || 0);
    const shotsAttempted = parseInt(event.target.attempts.value || 0);
    if (shotsMade > shotsAttempted) {
      window.alert("Error: Shots made larger than attempted");
    } else if (shotsMade < 0) {
      window.alert("Error: Shots must be 0 or higher");
    } else if (user === "") {
      window.alert("Error: You must be logged in to track shots");
    } else {
      const usersRef = firebase.database().ref("users/" + user);
      const shotsRef = usersRef.child("shots")
      const shots = {
        made: shotsMade,
        attempted: shotsAttempted,
        when: time
      }
      shotsRef.push(shots);
      event.target.makes.value = null;
      event.target.attempts.value = null;
    }
  }

  render() {
    let user = this.props.authUser ? this.props.authUser.uid : ""
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Shot Tracker</legend>
          <NumberInput label="Shots made" id="makes" />
          <NumberInput label="Shots attempted" id="attempts" />
          <input type="hidden" name="user" id="user" value={user} />
          <FormButton text="Save" label="submit" id="submit" />
        </fieldset>
      </form>
    );
  }
}

export default ShotTracker;