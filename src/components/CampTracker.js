import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import FormButton from './FormButton';
import '../style.css';

class CampTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camp: "",
      type: "",
      date: "",
      added: false
    };
  }


  onSubmit(event) {
    event.preventDefault();
    const time = new Date().getTime();
    const user = event.target.user.value;
    const campName = event.target.camp.value || "";
    const campType = event.target.type.value || "";
    const campDate = event.target.date.value || "";
    if (campName === "") {
      window.alert("Error: Please enter a name of the camp");
    } else if (campType === "") {
      window.alert("Error: Please select a type of Camp");
    } else if (campDate === "") {
      window.alert("Error: Please enter a camp date");
    } else if (user === "") {
      window.alert("Error: You must be logged in to enter activty");
    } else {
      const usersRef = firebase.database().ref("users/" + user);
      const campRef = usersRef.child("camps")
      const camp = {
        camp: campName,
        type: campType,
        date: campDate,
        when: time
      }
      campRef.push(camp);
      event.target.camp.value = null;
      event.target.date.value = null;
    }
  }

  handleCampChange = (event) => {
    this.setState({ camp: event.target.value });
  }

  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  }

  render() {
    let user = this.props.authUser ? this.props.authUser.uid : "";
    return (
      <div className="campTracker">
        <h1>Basketball Activity Tracker</h1>
        <p>Players attending basketball camp will be awarded shots for days attended.  Shooting Camps count as 250 shots, General Basketball Camps are 150, and Regulation Games are 100.</p>
        <p>Please log each day at basketball camp by entering the name of the camp, the type of camp and the date you attended</p>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Basketball Activity Tracker</legend>
            <div className="formInput">
              <label htmlFor="camp">Activity Name</label>
              <input onChange={this.handleCampChange} type="text" value={this.state.camp} id="camp" name="camp" placeholder="Camp Name" />
            </div>
            <div className="selectInput">
              <label>Activity Type</label>
              <select name="type" id="type">
                <option value="">Activity</option>
                <option value="Basketball Camp">Basketball Camp</option>
                <option value="Shooting Camp">Shooting Camp</option>
                <option value="Regulation Game">Regulation Game</option>
              </select>
            </div>
            <div className="formInput dateInput">
              <label htmlFor="date">Date Attended (MM/DD/YY)</label>
              <input onChange={this.handleDateChange} type="text" value={this.state.date} id="date" name="date" placeholder="MM/DD/YY" />
            </div>
            <input type="hidden" name="user" id="user" value={user} />
            <FormButton text="Save" label="submit" id="submit" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CampTracker;