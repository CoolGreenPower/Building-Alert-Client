import React from 'react';
import './SensorItem.css';

const SensorItem = ({ sensor, onClick }) => {
  return (
    <div className="sensor-item" onClick={onClick}>
      {sensor.name}
    </div>
  );
}

export default SensorItem;
