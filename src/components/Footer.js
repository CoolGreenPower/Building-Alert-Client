import React from 'react';
import logo from '../images/New Logo.png'
import userImage from '../images/Building.png'
import Home from '../images/Home.png'
import Analysis from '../images/Analysis.png'
import More from '../images/More.png'
import Settings from '../images/Settings.png'
import Profile from '../images/Profile.png'
import './Footer.css';

const Footer = () => {
  return (
    <div class="footer-nav">
  <a href="/home" class="nav-item">
    <img src={Home} alt="Home" />
    <span>Home</span>
  </a>
  <a href="/analysis" class="nav-item">
    <img src={Analysis} alt="Analysis" />
    <span>Analysis</span>
  </a>
  <a href="/add" class="nav-item">
    <img src={More} alt="Add" />
    <span>Add</span>
  </a>
  <a href="/settings" class="nav-item">
    <img src={Settings} alt="Settings" />
    <span>Settings</span>
  </a>
  <a href="/profile" class="nav-item">
    <img src={Profile} alt="Profile" />
    <span>Profile</span>
  </a>
</div>

  );
};

export default Footer;