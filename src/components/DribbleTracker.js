import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import FormButton from './FormButton';
import '../style.css';

class DribbleTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drillTotals: "",
      exercise: "",
      when: ""
    };
  }


  onSubmit(event) {
    event.preventDefault();
    const time = new Date().getTime();
    const user = event.target.user.value;
    const dribbleExercise = event.target.exercise.value || "";
    if (dribbleExercise === "") {
      window.alert("Error: Please select a type of Camp");
    } else {
      const usersRef = firebase.database().ref("users/" + user);
      const drillRef = usersRef.child("drills")
      const drill = {
        exercise: dribbleExercise,
        when: time
      }
      drillRef.push(drill);
      event.target.exercise.value = null;
    }
  }

  handleExerciseChange = (event) => {
    this.setState({ exercise: event.target.value });
  }
  
  componentDidMount() {
    let user = this.props.authUser ? this.props.authUser.uid : ""
    const drillsRef = firebase.database().ref("users/" + user + "/drills/");
    drillsRef.on('value', snap => {
        const drillData = snap.val();
        if (drillData !== null) {
            const intenseDrillTotal = Object.values(drillData).filter((item)=> item["exercise"] === "5 Minute Intense").length * 500 || 0;
            const playTotal = Object.values(drillData).filter((item)=> item["exercise"] === "15 Minute Hoops").length * 100 || 0;
            this.setState({
                drillTotals: intenseDrillTotal + playTotal
            })
        }
    })
  }
  render() {
    let user = this.props.authUser ? this.props.authUser.uid : "";
    return (
      <div className="shotTotals">
        <h1>Total Dribbles: {this.state.drillTotals}</h1>
        <p>Players can track their ball handling exercises in two categories:</p>
        <div class="drills">
          <ul>
            <li>5 Minute Intense workout - counts as 500 dribbles</li>
            <li>15 Minute Basketball playing - counts as 100 dribbles</li>
          </ul>
        </div>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Ball Handling Drills</legend>
            <div className="selectInput">
              <label>Activity Type</label>
              <select name="exercise" id="exercise">
                <option value="">Activity</option>
                <option value="5 Minute Intense">5 Minute Intense Ball Handling Drill</option>
                <option value="15 Minute Hoops">15 Minute Basketball Playing</option>
              </select>
            </div>
            <input type="hidden" name="user" id="user" value={user} />
            <FormButton text="Save" label="submit" id="submit" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default DribbleTracker;