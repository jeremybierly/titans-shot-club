import React, { Component } from 'react';
import * as firebase from 'firebase';
import ShotTracker from './ShotTracker.js';

class ShotTotals extends Component {
    constructor() {
        super();
        this.state = {
            madeShots: 0,
            attemptedShots: 0
        };
    }

    componentDidMount() {
        let user = this.props.authUser ? this.props.authUser.uid : ""
        const usersRef = firebase.database().ref("users/" + user + "/shots");
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
    }
    render() {
        let user = this.props.authUser ? this.props.authUser.uid : ""
        const percentage = this.state.madeShots > 0 ? Math.round(this.state.madeShots / this.state.attemptedShots * 100).toString() + "%" : "0%";
        return (
            <div className="shotTotals">
                <h1>Total Percentage: {percentage}</h1>
                <h2>Total Shots: {this.state.attemptedShots}</h2>

                <ShotTracker authUser={this.props.authUser} />
            </div>
        );
    }
}

export default ShotTotals;