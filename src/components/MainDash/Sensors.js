import React, { useState } from "react";
import SensorItem from "./SensorItem";
import SensorDetails from "./SensorDetails";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Sensors.css";

const Sensors = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentSensor, setCurrentSensor] = useState(null);

  const sensorItems = [
    {
      name: "Thermal Comfort Sensors",
      sensors: ["Sensor 1", "Sensor 2", "Sensor 3","Sensor 4", "Sensor 5", "Sensor 6","Sensor 7", "Sensor 8", "Sensor 9","Sensor 10", "Sensor 11", "Sensor 12"],
    },
    {
      name: "Weather Sensors",
      sensors: ["Sensor 4", "Sensor 5", "Sensor 6"],
    },
    {
        name: "HVAC Sensor",
        sensors: ["Sensor 4", "Sensor 5", "Sensor 6"],
      },
      {
        name: "Utility Sensor",
        sensors: ["Sensor 4", "Sensor 5", "Sensor 6"],
      },
      {
        name: "Water Sensor",
        sensors: ["Sensor 4", "Sensor 5", "Sensor 6"],
      },
    // More sensor data...
  ];

  const handleItemClick = (sensor) => {
    setCurrentSensor(sensor);
    setShowDetails(true);
  };

  const goBack = () => {
    setCurrentSensor(null);
    setShowDetails(false);
  };

  return (
    <div className="sensor">
      <h1>Sensors</h1>
      <div className="sensors_body">
        {showDetails ? (
          <div className="sensorDetailsContainer">
            <Button
              onClick={goBack}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              style={{
                backgroundColor: "#07502d",
                color: "#ffffff",
                padding: "10px 15px",
                borderRadius: "100px",
                fontSize: "10px",
                maxWidth: "200px",
                alignSelf: 'flex-end',
                marginBottom: '10px'
              }}
            >
              Go Back
            </Button>
            <SensorDetails sensorData={currentSensor} />
          </div>
        ) : (
          <div className="sensorItemsContainer">
            {sensorItems.map((item, index) => (
              <SensorItem key={index} sensor={item} onClick={() => handleItemClick(item)} />
            ))}
            <Button
              
              variant="contained"
              style={{
                backgroundColor: "#07502d",
                color: "#ffffff",
                padding: "10px 15px",
                borderRadius: "100px",
                fontSize: "10px",
                maxWidth: "200px",
                
                marginBottom: '10px'
              }}
            >
              Add New Device
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sensors;
