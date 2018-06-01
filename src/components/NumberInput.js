import React, { Component } from 'react';
import { render } from 'react-dom';

import '../styles/numberInput.css';


class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){   
  return (
    <div className="numberInput">
      <label htmlFor={this.props.id}>{this.props.label}</label>
      <input type="number" id={this.props.id} name={this.props.id} placeholder={this.props.label} pattern="[0-9]*" />
    </div>
  );
  }
}
export default NumberInput;