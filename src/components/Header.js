import React from 'react';
import logo from '../images/New Logo.png'
import userImage from '../images/Building.png'
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="myBuilding Alerts" className="logo" />
      <div className="all-buildings">
      <img src={userImage} alt="User" className="user-image" />
        <span className="buildings">All Buildings</span>
      </div>
      <div className="user-info">
        <span className="user-name">David</span>
      </div>
    </div>
  );
};

export default Header;