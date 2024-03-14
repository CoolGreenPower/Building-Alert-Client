// RequestHistory.jsx
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RequestCard from "../AlertManagement/AlertCard";
import "./RequestHistory.css";
import { theme } from "../../constants/constants";

const dummyData = [
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "123 Example St",
    date: "2023-07-17",
    device: "Device 1",
    status: "New",
  },
  {
    from: "456 Sample Rd",
    date: "2023-07-18",
    device: "Device 2",
    status: "In Progress",
  },
  {
    from: "456 Sample Rd",
    date: "2023-07-18",
    device: "Device 2",
    status: "Completed",
  },
  // Add more data as needed
];

const RequestHistory = () => {
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(false); // Add this

  // Add this
  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="requesthistory">
      <h1>Request History</h1>
      <div className="requestcards">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ThemeProvider theme={theme}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="basic tabs example"
              >
                <Tab icon={<AddIcon />} label="New" />
                <Tab icon={<HourglassEmptyIcon />} label="In Progress" />
                <Tab icon={<CheckCircleIcon />} label="Completed" />
              </Tabs>
            </ThemeProvider>
          </Box>
          <div className="requestCards" style={{ maxHeight: "70vh", overflowY: "scroll" }} >
            {value === 0 && (
              <Typography >
                {dummyData
                  .filter((data) => data.status === "New")
                  .map((data, index) => (
                    <RequestCard
                      key={index}
                      data={data}
                      expanded={expanded === `panel${index}`}
                      onChange={handleAccordionChange(`panel${index}`)}
                    />
                  ))}
              </Typography>
            )}

            {value === 1 && (
              <Typography>
                {dummyData
                  .filter((data) => data.status === "In Progress")
                  .map((data, index) => (
                    <RequestCard
                      key={index}
                      data={data}
                      expanded={expanded === `panel${index}`}
                      onChange={handleAccordionChange(`panel${index}`)}
                    />
                  ))}
              </Typography>
            )}

            {value === 2 && (
              <Typography>
                {dummyData
                  .filter((data) => data.status === "Completed")
                  .map((data, index) => (
                    <RequestCard
                      key={index}
                      data={data}
                      expanded={expanded === `panel${index}`}
                      onChange={handleAccordionChange(`panel${index}`)}
                    />
                  ))}
              </Typography>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default RequestHistory;
