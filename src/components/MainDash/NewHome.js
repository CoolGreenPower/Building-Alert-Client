import React from 'react';
import { useHistory } from 'react-router-dom';
import './NewHome.css'; // Ensure the CSS file is linked

// Import your images and icons
import Gauge from '../../images/Guage.png';
import Messages from '../../images/Messages.png';
import Notification from '../../images/Notifications.png';
import Safety from '../../images/safety.png';
import Resource from '../../images/Resource.png';
import Service from '../../images/Service.png';

import Header from '../Header';
import Footer from '../Footer';
// Example data structure

const NewHome = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear the user's auth state, e.g., removing token from localStorage
    localStorage.setItem('isLoggedIn', 'false');
              history.push("/");
  };
const alertsData = [
  {
    title: 'Health & Safety',
    icon: Safety,
    newCount: 3,
    inProcessCount: 3
  },
  {
    title: 'Resource Efficiency',
    icon: Resource,
    newCount: 2,
    inProcessCount: 1
  },
  {
    title: 'Service Check',
    icon: Service,
    newCount: 1,
    inProcessCount: 2
  }
];
const messageCount = 5; // Example count, should be dynamic based on real data
const externalCount = 2;
  return (
  <div>
      <Header/>
  <div className='NewHome'>
    <div className="alerts-section">
      <div className="alerts-header">
        <h2>Building Alerts</h2>
      </div>
      <div className="alerts-container">
        {alertsData.map(alert => (
          <div className="alert-card" key={alert.title}>
            <img src={alert.icon} alt={alert.title} className="alert-icon" />
            <div className="alert-info">
              <h3>{alert.title}</h3>
              <div className="alert-status">
                <div className="new-1">
                <span className="new-alert">{alert.newCount}</span>
                <p>New</p>
                </div>
                <div className="new-1">
                <span className="in-process-alert">{alert.inProcessCount} </span>
                <p>In Process</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="benefit-tracker-section">
      <div className="benefit-tracker-header">
        <h2>Benefit Tracker</h2>
      </div>
      <div className="benefit-tracker-container">
        <div className="benefit-tracker-card">
          <img src={Gauge} alt="Occupant Satisfaction" />
          <p>Occupant Satisfaction</p>
        </div>
        <div className="benefit-tracker-card">
          <img src={Gauge} alt="Resource Effectiveness" />
          <p>Resource Effectiveness</p>
        </div>
        <div className="benefit-tracker-card">
          <img src={Gauge} alt="Operational Efficiency" />
          <p>Operational Efficiency</p>
        </div>
      </div>
    </div>
    <div className="messages-notifications-section">
      <div className="messages-notifications-header">
        <h2>Messages & Notifications</h2>
      </div>
      <div className="messages-notifications-container">
        <div className="notification-card">
          <img src={Messages} alt="Message Board" />
          <span className="notification-badge">{messageCount}</span>
          <p>Message Board</p>
        </div>
        <div className="notification-card">
          <img src={Notification} alt="External Notification" />
          <span className="notification-badge">{externalCount}</span>
          <p>External Notification</p>
        </div>
      </div>
    </div>
    <button onClick={handleLogout} className="logout-button">Logout</button>
    <Footer/>
  </div>
  </div>
  );
};
export default NewHome;