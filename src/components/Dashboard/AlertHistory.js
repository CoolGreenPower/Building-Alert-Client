// AlertHistory.jsx
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./AlertHistory.css";
import DetailsForAcc from "../Cards/DetailsForAcc";

const dummyData = [
  {
    timestamp: "2023-07-17 12:34:56",
    device: "Device 1",
    details: "Details about alert 1",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },
  {
    timestamp: "2023-07-17 11:22:33",
    device: "Device 2",
    details: "Details about alert 2",
  },

  // Add more data as needed
];

const AlertHistory = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="alerthistory" >
      <h1>Alert History</h1>
      <div style={{padding:"1rem"}} >
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Typography style={{  fontSize: "15px" }}>Timestamp</Typography>
        </div>
        <div style={{ width: "50%" }}>
          <Typography style={{  fontSize: "15px" }}>Device</Typography>
        </div>
      </div>
      <div  style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      {dummyData.map((row, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id={`panel-header${index}`}
          >
            <Typography
              variant="body1"
              style={{ flexBasis: "50%", fontSize: "10px" }}
            >
              {row.timestamp}
            </Typography>
            <Typography
              variant="body1"
              style={{ flexBasis: "50%", fontSize: "10px" }}
            >
              {row.device}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DetailsForAcc category={"Request ID"} details={"123456"} />
            <DetailsForAcc
              category={"Date Reported"}
              details={"October 10, 2022 11:10 am EST"}
            />
          </AccordionDetails>
        </Accordion>
        
      ))}
      </div>
      </div>
    </div>
  );
};

export default AlertHistory;
