// SensorDetails.js
import React, { useState } from 'react';
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './SensorDetails.css';

const SensorDetails = ({ sensorData }) => {
  const [selectedSensor, setSelectedSensor] = useState(null);

  const handleSensorClick = (sensor) => {
    if (selectedSensor === sensor) {
      setSelectedSensor(null);
    } else {
      setSelectedSensor(sensor);
    }
  };

  return (
    <div className="sensor-details">
      <h2>{sensorData.name}</h2>
      {sensorData.sensors.map((sensor, index) => (
        <div key={index} className={`sensor-item ${selectedSensor === sensor ? 'expanded' : ''}`}>
          <p onClick={() => handleSensorClick(sensor)} style={{ display: selectedSensor === sensor ? 'none' : 'block' }}>{sensor}</p>
          {selectedSensor === sensor && (
            <div className="sensor-details-expanded">
              <img src="https://m.media-amazon.com/images/I/51vjw8de57L._AC_UF1000,1000_QL80_.jpg" alt="sensor" className="sensor-image"/>
              <div className="sensor-details-buttons">
                <Button className="sensor-button" variant="contained">Report an Issue</Button>
                <Button className="sensor-button" variant="contained">Alert History</Button>
                <Button className="sensor-button" variant="contained">Device Settings</Button>
              </div>
              <CloseIcon className="sensor-details-close" onClick={() => setSelectedSensor(null)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SensorDetails;
