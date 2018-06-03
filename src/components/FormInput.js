import React, { Component } from 'react';
import { render } from 'react-dom';

import '../styles/formInput.css';


class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.props.owner.setState({username: event.target.value});
  }

  render(){   
  return (
    <div className="formInput">
      <label htmlFor={this.props.id}>{this.props.label}</label>
      <input onChange={this.handleChange} type="text" value={this.props.value} id={this.props.id} name={this.props.id} placeholder={this.props.label} />
    </div>
  );
  }
}
export default FormInput;