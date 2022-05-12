import React, { Component } from 'react';
import * as firebase from 'firebase';
import ShotTracker from './ShotTracker.js';

class ShotTotals extends Component {
    constructor() {
        super();
        this.state = {
            madeShots: 0,
            attemptedShots: 0,
            campOffset: 0,
        };
    }

    componentDidMount() {
        let user = this.props.authUser ? this.props.authUser.uid : ""
        const usersRef = firebase.database().ref("users/" + user + "/shots/");
        usersRef.on('value', snap => {
            const data = snap.val();
            const totalReducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)
            if (data !== null) {
                
                this.setState({
                    madeShots: Object.keys(data).map((key) => data[key].made).reduce(totalReducer),
                    attemptedShots: Object.keys(data).map((key) => data[key].attempted).reduce(totalReducer)
                });
            }
        })
        const campsRef = firebase.database().ref("users/" + user + "/camps/");
        campsRef.on('value', snap => {
            const campData = snap.val();
            if (campData !== null) {
                const shootingCampOffset = Object.values(campData).filter((item)=> item["type"] === "Shooting Camp").length * 250 || 0;
                const basketballCampOffset = Object.values(campData).filter((item)=> item["type"] === "Basketball Camp").length * 150 || 0;
                const regulationGameOffset = Object.values(campData).filter((item)=> item["type"] === "Regulation Game").length * 100 || 0;
                this.setState({
                    campOffset: shootingCampOffset + basketballCampOffset + regulationGameOffset
                })
            }
        })
    }
    render() {
        let user = this.props.authUser ? this.props.authUser.uid : ""
        const percentage = this.state.madeShots > 0 ? Math.round(this.state.madeShots / this.state.attemptedShots * 100).toString() + "%" : "0%";
        const then = new Date("09/01/2022");
        const now = new Date();
        const days = Math.ceil((then-now)/(1000*60*60*24));
        const shotsLeft = 10000-this.state.campOffset-this.state.attemptedShots;
        const shotsPerDay = Math.ceil(shotsLeft/days);
        return (
            <div className="shotTotals">
                <h1>Total Percentage: {percentage}</h1>
                <h2>Total Shots: {this.state.attemptedShots}</h2>

                <ShotTracker authUser={this.props.authUser} />
                <p>You need to take <strong>{shotsPerDay}</strong> shots per day to make <strong>{shotsLeft}</strong> by <strong>September 3rd</strong>.</p>
            </div>
        );
    }
}

export default ShotTotals;
