import React from 'react'
import { Typography } from '@mui/material';

const DetailsForAcc = ({ category, details }) => {
  return (
    
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography
            variant="body1"
            style={{ color: "#07502d", fontWeight: "bold", fontSize:"10px" }}
          >{`${category}:`}</Typography>
          <Typography variant="body2" style={{ color: "#07502d", fontSize:"10px"}}>
            {details}
          </Typography>
        </div>
      );

}

export default DetailsForAcc