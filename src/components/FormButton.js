import React from 'react';
import '../styles/formButton.css';
const FormButton = ({label,id,text}) => (
  <div className="formButton">
    <label htmlFor={id}>{label}</label>
    <button id={id} name={id}>{text}</button>
  </div>
);

export default FormButton;