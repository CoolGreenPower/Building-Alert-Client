import React, { useState } from "react";
import CustomAccordion from '../Cards/CustomAccordion';
import { Button } from "@mui/material";
import "./TenantList.css";

const menuItems = [
  {
    name: "Cool Green Power",
    description: "Tenant 1",
  },
  { name: "TD Bank", description: "Tenant  2" },
  {
    name: "Umass Lib",
    description: "Tenant 3",
  },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },

  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },
  { name: "Business 2", description: "Tenant 4" },

];

const TenantList = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="tenantList">
      <h1>Tenant List</h1>
      <div className="tenantContainer" >
      {menuItems.map((item, index) => (
        <CustomAccordion 
          key={index} 
          item={item} 
          expanded={expanded === index}
          onChange={handleChange(index)}
        />
      ))}
      </div>
      <Button 
        variant="contained" 
        sx={{ 
          borderRadius: '100px', 
          backgroundColor: '#07502d', 
          color: '#fff', 
          width: '100%', 
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#07502d',
            border:"1px solid #07502d"
          },
        }}
      >
        Add Tenant
      </Button>
    </div>
  );
};

export default TenantList;
