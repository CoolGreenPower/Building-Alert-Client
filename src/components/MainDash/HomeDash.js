import React, { useState } from "react";
import AlertCard from "../AlertManagement/AlertCard"; // Import your RequestCard component
import "./HomeDash.css";
import { Link } from "react-router-dom";
import RequestTile from "../RequestManagement/RequestTile";
import { useHistory } from 'react-router-dom';
// Dummy data
const alerts = [
  {
    alertId: "T-34",
    priority: "High",
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    priority: "Low",
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    priority: "High",
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    priority: "High",
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    priority: "Low",
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  },
  {
    alertId: "T-34",
    priority: "High",
    date_reported: "October 10, 2022 11:10 am EST", description: "Relative Humidity is low and tempera-ture is high increasing the risk of dehydration, dry skin, irritated nasal passages and throat, and itchy eyes", location: "130 Summer St, Malden MA 02148", unit: "101", status: "New (Unassigned)"
  }
];

const requests = [
  { from: "Person 4", date: "2023-02-01", device: "Device 4" },
  { from: "Person 5", date: "2023-02-02", device: "Device 5" },
  { from: "Person 6", date: "2023-02-03", device: "Device 6" },
  { from: "Person 6", date: "2023-02-03", device: "Device 6" },
  { from: "Person 6", date: "2023-02-03", device: "Device 6" },
];

const HomeDash = () => {
  const history = useHistory();

  const Heading = ({ title, route }) => {
    return (
      <div className="sectionHeadingContainer">
        <h2 className="sectionHeading">{title}</h2>
        <Link
          to={route}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "50px",
            border: "1px solid #07502d",
            color: "#07502d",
            fontSize: "12px",
            padding: "3px 6px",
            marginLeft: "10px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          View All
        </Link>
      </div>
    );
  }


  return (
    <div className="HomeDash">
      <div className="flex lg:visible">
        <h2 className="title">Home</h2>
      </div>
      <div className="alertsContainer border mt-4">
        <Heading title="New Alerts" route="/alerts/manage" />
        <div className="flex-col h-96 overflow-y-scroll">
          {alerts.map((alert, index) => (
            <AlertCard
              key={index}
              data={alert}
              onClick={() => history.push(`/alerts/review/${alert.alertId}`)}
            />
          ))}
        </div>
      </div>
      <div className="requestsContainer border">
        <Heading title="New Requests" route="/requests/in-progress" />
        <div className="flex-col h-96 overflow-y-scroll ">
          {requests.map((request, index) => (
            <RequestTile
              key={index} // Add a key prop for each element in the map function
              from={'Bank of America'}
              location={'San Francisco, CA'}
              date={'10/10/2021'}
            />
          ))}
        </div>
      </div>
      <Link
        to="/MainDash"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#07502d",
          color: "#ffffff",
          borderRadius: "100px",
          border: "1px solid #07502d",
          fontSize: "12px",
          padding: "10px 20px",
          textDecoration: "none",
          width: "100%",
          maxWidth: "300px", // Max width to keep button size reasonable on large screens
          margin: "0 auto", // Center button
          transition: "0.3s", // Transition for hover effect
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.color = "#07502d";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#07502d";
          e.target.style.color = "#ffffff";
        }}
      >
        View Individual Properties
      </Link>
    </div >
  );
};

export default HomeDash;
