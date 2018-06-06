import React from 'react';
import logo from '../logo.svg';

const LandingPage = () =>
  <div class="landing">
    <h1>10,000 Shot Club</h1>
    <p>The Glen Ellyn Titans 10,000 Shot Program is a chance for you to improve your shooting skills over the summer giving you a goal you can achieve.</p>
    <p className="homePage"><img src={logo} className="landing-logo" alt="logo" /></p>
    <p><a href="/signin">Sign In</a> or <a href="/signup">Sign Up</a>!</p>
  </div>

export default LandingPage;