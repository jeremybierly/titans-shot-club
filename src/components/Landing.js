import React from 'react';
import logo from '../logo.svg';

const LandingPage = () =>
  <div class="landing">
    <h1>10,000 Shot Club and 50,000 Dribble Club</h1>
    <p>The Glen Ellyn Titans 10,000 Shot / 50,000 Dribble Program is a chance for you to improve your basketball skills over the off season giving you a goal you can achieve.</p>
    <p className="homePage"><img src={logo} className="landing-logo" alt="logo" /></p>
    <p><a href="/signin">Sign In</a> or <a href="/signup">Sign Up</a>!</p>
    <br/><br/>
  </div>

export default LandingPage;