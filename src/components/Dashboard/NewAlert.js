import { List } from '@mui/material'
import React from 'react'

const NewAlert = () => {
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  return (
    <div>
      <h1>List of 100 Alerts</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
};

export default NewAlert;