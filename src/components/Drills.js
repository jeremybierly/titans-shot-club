import React, { Component } from 'react';
import formShootingDrill from '../form-shooting-drill.png';
import '../styles/drills.css';

class Drills extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="drills">
        <h1>Shooting Drills</h1>
        <h4>Warm Up Shooting Drill</h4>
        <p>5 from each spot in the diagram</p>
        <img src={formShootingDrill} alt="Form Shooting Drill" />
        <p>Start close the the basket and work your way to the 3 point line</p>
        <strong>100 Shots</strong>

        <h4>Finishing Moves</h4>
        <p>10 Shots from each side of the following, followed by free throws</p>
        <ul>
          <li>Layups, right & left sides</li>
          <li>2 Foot Jump Stop, right & left sides</li>
          <li>Step Through (vicious pivot) right & left sides</li>
          <li>Reverse Lay-up, right & left sides</li>
          <li>Post moves from the block, right & left sides</li>
          <li>Jab or stutter step, then explosive layup, right & left sides</li>
          <li>Mikans, right & left sides</li>
          <li>20 Free throws</li>
        </ul>
        <strong>160 Total shots</strong>

        <h4>Ball Toss Catch and Shoot</h4>
        <p>10 Shots of each of the following, followed by 20 free throws</p>
        <ul>
          <li>Block to Block  (10 from the right and left sides)</li>
          <li>Right Wing</li>
          <li>Left Wing</li>
          <li>Right Baseline</li>
          <li>Left Baseline</li>
          <li>Right Elbow</li>
          <li>Left Elbow</li>
          <li>20 Free throws</li>
        </ul>
        <strong>100 Total shots</strong>

        <h4>Shooting – Off the Dribble</h4>
        <p>10 Shots of each of the following</p>
        <ul>
          <li>Right Wing (Turn the Corner Jumper)</li>
          <li>Left Wing (Turn the Corner Jumper)</li>
          <li>Right Wing (Turn the Corner Step Back Jumper)</li>
          <li>Left Wing (Turn the Corner Step Back Jumper)</li>
          <li>3 Point line</li>
          <li>20 Free throws</li>
        </ul>
        <strong>70 Total shots</strong>
      </div>);
  }
}
export default Drills;