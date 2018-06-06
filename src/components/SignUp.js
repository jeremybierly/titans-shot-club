import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, database } from '../firebase';
import * as routes from '../constants/routes';
import "../styles/signUp.css";

const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  grade: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      grade,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        database.doCreateUser(authUser.user.uid, username, grade, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.SHOT_TRACKER);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Sign Up</legend>
          <div className="signUp">
            <input
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="selectInput">
            <label>Grade Level</label>
            <select name="grade" id="grade" onChange={event => this.setState(byPropKey('grade', event.target.value))}>
              <option>Grade</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="signUp">
            <input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
            <input
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
            />
            <input
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="formButton">
            <button disabled={isInvalid} type="submit">
              Sign Up
          </button>
          </div>
          {error && <p>{error.message}</p>}
        </fieldset>
      </form>
    );
  }
}

const SignUpLink = () =>
  <div className="landing">
    <p>
      Don't have an account?
      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  </div>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};